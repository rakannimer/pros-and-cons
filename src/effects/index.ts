import * as db from "idb-keyval";

import { State, Effect, ObservableState } from "../types";
import { getHistory, getFirebase, NO_OP } from "../utils";
import { state, getSerializedState } from "../state";

// <Cache>
export const hydrateFromCache: Effect = {
  dependencies: s => [state.idInUrl.get()],
  effect: (dispatch, s) => () => {
    let isMounted = true;
    const listId =
      state.idInUrl.get() === "" ? "offline-list" : state.idInUrl.get();
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

// <History>
export const mapHistoryToState: Effect = {
  dependencies: state => [],
  effect: (dispatch, state) => () => {
    const history = getHistory();
    const idInUrl = history.location.pathname.substr(
      1,
      history.location.pathname.length
    );
    dispatch({
      type: "update-url",
      payload: {
        idInUrl
      }
    });
    const unlisten = history.listen((location, action) => {
      const idInUrl = location.pathname.substr(1, location.pathname.length);
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
    const sessionId = state.idInUrl.get();
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
  dependencies: state => [state.idInUrl.get()]
};
// </Auth>

export const setInitialFirebaseState: Effect = {
  effect: (dispatch, state) => () => {
    const sessionId = state.idInUrl.get();
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
        .update(getSerializedState());
    }
    getTitle().then(title => {
      // List does not exist in Firebase so we create it.
      if (title === null) {
        return setInitialStateInFirebase();
      }
    });
  },
  dependencies: state => [state.idInUrl.get()]
};

export const listenToRemoteState: Effect<
  ObservableState,
  typeof import("firebase")
> = {
  effect: (dispatch, state, firebase) => () => {
    const sessionId = state.idInUrl.get();
    // const firebase = state.firebase;
    if (
      state.isAuthed.get() === false ||
      firebase === undefined ||
      sessionId === ""
    ) {
      console.warn(
        "HEERE NOT LISTENING ",
        firebase === undefined,
        state.isAuthed.get() === false,
        sessionId === ""
      );
      return NO_OP;
    }
    console.warn("here listening", firebase);
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
  dependencies: (state, firebase) => [
    state.isAuthed.get(),
    firebase,
    state.idInUrl.get()
  ]
};

export const computeWinner: Effect = {
  effect: (dispatch, state) => () => {
    const prosScore = state.pros.reduce((acc, cur) => {
      acc += cur.weight.get();
      return acc;
    }, 0);
    const consScore = state.cons.reduce((acc, cur) => {
      acc += cur.weight.get();
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
