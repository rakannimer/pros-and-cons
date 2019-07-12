import * as db from "idb-keyval";

import { State, Effect } from "../types";
import { getHistory, getFirebase, NO_OP } from "../utils";

// <Cache>
export const hydrateFromCache: Effect = {
  dependencies: state => [state.idInUrl],
  effect: (dispatch, state) => () => {
    let isMounted = true;
    const listId = state.idInUrl === "" ? "offline-list" : state.idInUrl;
    db.get<State>(listId).then(v => {
      if (isMounted === false || v === undefined) return;
      dispatch({ type: "hydrate", payload: v });
    });
    return () => {
      isMounted = false;
    };
  }
};
// </Cache>

const getIdFromUrl = (str: string) => {
  const strChunks = str.split("/").filter(v => v !== "");
  if (strChunks.length === 2 && strChunks[0] === "list") {
    return strChunks[1];
  } else {
    return "";
  }
};

// <History>
export const mapHistoryToState: Effect = {
  dependencies: state => [],
  effect: (dispatch, state) => () => {
    const history = getHistory();

    const idInUrl = getIdFromUrl(history.location.pathname);
    dispatch({
      type: "update-url",
      payload: {
        idInUrl
      }
    });

    const unlisten = history.listen((location, action) => {
      const idInUrl = getIdFromUrl(history.location.pathname);
      dispatch({
        type: "update-url",
        payload: {
          idInUrl
        }
      });
    });
    return unlisten;
  }
};
// </History>

// <Auth>
export const authWithFirebase: Effect = {
  effect: (dispatch, state) => () => {
    const sessionId = state.idInUrl;
    let isMounted = true;
    if (sessionId === "") {
      return () => {};
    }
    async function getAuth() {
      const firebase = await getFirebase();
      dispatch({ type: "set-firebase", payload: firebase });
      const isAuthed = firebase.auth().currentUser !== null;
      if (!isAuthed) {
        await firebase.auth().signInAnonymously();
      }
    }
    getAuth().then(() => {
      if (!isMounted) return;
      dispatch({ type: "set-is-authed", payload: true });
    });
    return () => {
      isMounted = false;
    };
  },
  dependencies: state => [state.idInUrl]
};
// </Auth>

export const setInitialFirebaseState: Effect = {
  effect: (dispatch, state) => () => {
    const sessionId = state.idInUrl;
    if (sessionId === "") return;
    async function getTitle() {
      const firebase = await getFirebase();
      return (await firebase
        .database()
        .ref(`sessions/${sessionId}/title`)
        .once("value")).val();
    }
    async function setInitialStateInFirebase() {
      const firebase = await getFirebase();
      await firebase
        .database()
        .ref(`sessions/${sessionId}/`)
        .update({
          ...state,
          firebase: null
        });
    }
    getTitle().then(title => {
      // List does not exist in Firebase so we create it.
      if (title === null) {
        return setInitialStateInFirebase();
      }
    });
  },
  dependencies: state => [state.idInUrl]
};

export const listenToRemoteState: Effect = {
  effect: (dispatch, state) => () => {
    const sessionId = state.idInUrl;
    if (
      state.isAuthed === false ||
      state.firebase === null ||
      sessionId === ""
    ) {
      return NO_OP;
    }
    const { firebase } = state;
    const unsubFromTitle = firebase
      .database()
      .ref(`sessions/${sessionId}/title`)
      .on("value", v => {
        if (v === null || v.val() === null) {
          return;
        }
        dispatch({ type: "set-title", payload: { title: v.val() } });
      });
    const unsubFromPros = firebase
      .database()
      .ref(`sessions/${sessionId}/pros`)
      .on("value", v => {
        if (v === null || v.val() === null) {
          return;
        }
        dispatch({ type: "set-pros", payload: v.val() });
      });
    const unsubFromCons = firebase
      .database()
      .ref(`sessions/${sessionId}/cons`)
      .on("value", v => {
        if (v === null || v.val() === null) {
          return;
        }
        dispatch({ type: "set-cons", payload: v.val() });
      });
    return () => {
      unsubFromCons(null);
      unsubFromPros(null);
      unsubFromTitle(null);
    };
  },
  dependencies: state => [state.isAuthed, state.firebase, state.idInUrl]
};

export const computeWinner: Effect = {
  effect: (dispatch, state) => () => {
    const prosScore = state.pros.reduce((acc, cur) => {
      acc += cur.weight;
      return acc;
    }, 0);
    const consScore = state.cons.reduce((acc, cur) => {
      acc += cur.weight;
      return acc;
    }, 0);
    const winnerId =
      prosScore === consScore ? "" : prosScore > consScore ? "pros" : "cons";
    dispatch({
      type: "set-winner-id",
      payload: {
        winnerId
      }
    });
  },
  dependencies: state => [state.pros, state.cons]
};
