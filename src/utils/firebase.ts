import memoize from "memoize-one";
import { debounce } from "debounce";

import { Dispatcher, State, Action } from "../types";
import { getInitialState } from "../initial-state";

const firebaseSet = (path: string, value: unknown) => {
  return getFirebase().then(firebase => {
    console.warn("path ", path, " value : ", value);
    return firebase
      .database()
      .ref(path)
      .set(value);
  });
};
const debouncedSet = debounce(firebaseSet);

const firebaseUpdate = (path: string, value: {}) => {
  return getFirebase().then(firebase => {
    console.warn("path ", path, " value : ", value);
    return firebase
      .database()
      .ref(path)
      .update(value);
  });
};

const debouncedUpdate = debounce(firebaseUpdate);

export const initializeFirebase = async (
  sessionId: string,
  dispatch: Dispatcher,
  state: State
) => {
  if (sessionId === "") {
    return;
  }
  const firebase = await getFirebase();
  const isAuthed = firebase.auth().currentUser !== null;
  if (!isAuthed) {
    await firebase.auth().signInAnonymously();
  }
  dispatch({ type: "set-is-authed", payload: true });
  const title = (await firebase
    .database()
    .ref(`sessions/${sessionId}/title`)
    .once("value")).val();
  if (title === null) {
    await firebase
      .database()
      .ref(`sessions/${sessionId}/`)
      .update(getInitialState());
  }
  firebase
    .database()
    .ref(`sessions/${sessionId}/title`)
    .on("value", v => {
      dispatch({ type: "set-title", payload: { title: v.val() } });
    });
  firebase
    .database()
    .ref(`sessions/${sessionId}/pros`)
    .on("value", v => {
      if (v.val() === null) {
        return;
      }
      dispatch({ type: "set-pros", payload: v.val() });
    });
  firebase
    .database()
    .ref(`sessions/${sessionId}/cons`)
    .on("value", v => {
      if (v.val() === null) {
        return;
      }
      dispatch({ type: "set-cons", payload: v.val() });
    });
};

export const getFirebase = memoize(
  async () => {
    console.log("getting firebase");
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
        debouncedSet(`sessions/${state.idInUrl}/title`, action.payload.title);
        break;
      }
      case "edit-argument": {
        const { payload } = action;
        const { id, type } = payload.argument;
        const listType = type === "pro" ? "pros" : "cons";
        const index = newState[listType].findIndex(v => v.id === id);

        if (index === -1) return newState;
        // console.error("Updating argument");
        debouncedUpdate(
          `sessions/${state.idInUrl}/${listType}/${index}`,
          payload.argument
        );
        break;
      }
      case "delete-argument": {
        const { payload } = action;
        const { id, type } = payload.argument;
        const listType = type === "pro" ? "pros" : "cons";
        console.warn("debounced set ", newState[listType]);
        firebaseUpdate(
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
    }
    return newState;
  };
  return newReducer;
};
