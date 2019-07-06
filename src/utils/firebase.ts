import memoize from "memoize-one";
import { debounce } from "debounce";

import { Dispatcher, State, Action } from "../types";

export const firebaseSet = (path: string, value: unknown) => {
  return getFirebase().then(firebase => {
    return firebase
      .database()
      .ref(path)
      .set(value);
  });
};
export const firebaseDebouncedSet = debounce(firebaseSet);

export const firebaseUpdate = (path: string, value: {}) => {
  return getFirebase().then(firebase => {
    return firebase
      .database()
      .ref(path)
      .update(value);
  });
};

export const firebaseDebouncedUpdate = debounce(firebaseUpdate);

export const listenToRemoteState = (
  firebase: typeof import("firebase"),
  sessionId: string,
  dispatch: Dispatcher
) => {
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
};

export const initializeFirebaseState = (sessionId: string, state: State) => {
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
      .update(state);
  }
  getTitle().then(title => {
    // List does not exist in Firebase so we create it.
    if (title === null) {
      return setInitialStateInFirebase();
    }
  });
};

export const getFirebase = memoize(
  async () => {
    const firebasePromise: [
      typeof import("firebase/app"),
      unknown,
      unknown
    ] = await Promise.all([
      import("firebase/app"),
      import("firebase/database"),
      import("firebase/auth")
    ]);
    const firebaseConfig = {
      apiKey: "AIzaSyDFlpM-x7xMq_0GHfgoBCeYKfXdtfTZYG0",
      authDomain: "pros-and-cons-c21f9.firebaseapp.com",
      databaseURL: "https://pros-and-cons-c21f9.firebaseio.com",
      projectId: "pros-and-cons-c21f9",
      storageBucket: "",
      messagingSenderId: "319805998868",
      appId: "1:319805998868:web:7767e7938b9224f9"
    };
    const [firebase] = firebasePromise;
    firebase.initializeApp(firebaseConfig);
    return firebase;
  },
  () => true
);

export const withFirebaseStorage = (reducer: React.Reducer<State, Action>) => {
  const newReducer = (state: State, action: Action) => {
    const newState = reducer(state, action);
    if (!state.isAuthed) return newState;
    switch (action.type) {
      case "set-title": {
        firebaseDebouncedSet(
          `sessions/${state.idInUrl}/title`,
          action.payload.title
        );
        break;
      }
      case "edit-argument": {
        const { payload } = action;
        const { id, type } = payload.argument;
        const listType = type === "pro" ? "pros" : "cons";
        const index = newState[listType].findIndex(v => v.id === id);

        if (index === -1) return newState;
        firebaseDebouncedUpdate(
          `sessions/${state.idInUrl}/${listType}/${index}`,
          payload.argument
        );
        break;
      }
      case "delete-argument": {
        const { payload } = action;
        const { id, type } = payload.argument;
        const listType = type === "pro" ? "pros" : "cons";
        firebaseSet(
          `sessions/${state.idInUrl}/${listType}/`,
          newState[listType]
        );
        break;
      }
      case "add-argument": {
        const { payload } = action;
        const { argument } = payload;
        const listType = argument.type === "pro" ? "pros" : "cons";
        firebaseSet(
          `sessions/${state.idInUrl}/${listType}/${newState[listType].length -
            1}`,
          argument
        );
        break;
      }
      case "clear-list": {
        firebaseSet(`sessions/${newState.idInUrl}/title`, null);
        firebaseSet(`sessions/${newState.idInUrl}/pros`, null);
        firebaseSet(`sessions/${newState.idInUrl}/cons`, null);
        break;
      }
      case "reorder-list": {
        const { payload } = action;
        const { listType } = payload;
        firebaseSet(
          `sessions/${newState.idInUrl}/${listType}`,
          newState[listType]
        );
        break;
      }
      case "move-to-list": {
        firebaseSet(`sessions/${newState.idInUrl}/pros`, newState.pros);
        firebaseSet(`sessions/${newState.idInUrl}/cons`, newState.cons);
        break;
      }
    }
    return newState;
  };
  return newReducer;
};
