import * as React from "react";
import { render } from "react-dom";
import * as db from "idb-keyval";
import download from "js-file-download";

import "./styles.css";
import "./icons.css";
import "animate.css/animate.min.css";

import { getInitialState } from "./state/initial-state";
import { reducer } from "./state/reducer";
import { LeftSidebar, Header, RightSidebar } from "./components";
import { State } from "./types";
import {
  listenToRemoteState,
  mapHistoryToState,
  getFirebase,
  NO_OP,
  initializeFirebaseState
} from "./utils";
import { DispatcherContext } from "./state/DispatcherContext";
import { ProsAndCons } from "./components/ProsAndCons";
import { withFirebaseUpdate } from "./higher-order-reducers/firebase";
import { withLocalStorageUpdate } from "./higher-order-reducers/indexed-db";

let App = () => {
  const [state, dispatch] = React.useReducer(
    withFirebaseUpdate(withLocalStorageUpdate(reducer)),
    getInitialState()
  );
  const [firebase, setFirebase] = React.useState<
    null | typeof import("firebase")
  >(null);

  React.useEffect(() => mapHistoryToState(dispatch), []);

  // Hydrate from cache
  React.useEffect(() => {
    let isMounted = true;
    const listId = state.idInUrl === "" ? "offline-list" : state.idInUrl;
    db.get<State>(listId).then(v => {
      if (isMounted === false || v === undefined) return;
      dispatch({ type: "hydrate", payload: v });
    });
    return () => {
      isMounted = false;
    };
  }, [state.idInUrl]);

  // Auth
  React.useEffect(() => {
    const sessionId = state.idInUrl;
    let isMounted = true;
    if (sessionId === "") {
      return () => {};
    }
    async function getAuth() {
      const firebase = await getFirebase();
      setFirebase(firebase);
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
  }, [state.idInUrl]);

  React.useEffect(() => {
    const sessionId = state.idInUrl;
    if (state.isAuthed === false || firebase === null || sessionId === "") {
      return NO_OP;
    }
    const stopListening = listenToRemoteState(firebase, sessionId, dispatch);
    return stopListening;
  }, [state.isAuthed, firebase, state.idInUrl]);

  React.useEffect(() => {
    const sessionId = state.idInUrl;
    if (sessionId === "") return;
    initializeFirebaseState(sessionId, state);
  }, [state.idInUrl]);

  function downloadAsJson() {
    download(JSON.stringify(state, null, 2), "pros-and-cons-list.json");
  }
  const pros = state.pros;
  const cons = state.cons;

  React.useEffect(() => {
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
  }, [pros, cons]);

  return (
    <DispatcherContext.Provider value={dispatch}>
      <div className="app-container">
        <LeftSidebar />
        <div className="app-without-left-sidebar">
          <Header
            idInUrl={state.idInUrl}
            title={state.title}
            downloadAsJson={downloadAsJson}
          />
          <div className="pros-and-cons-and-right-sidebar">
            <ProsAndCons
              winner={state.winner}
              pros={state.pros}
              cons={state.cons}
            />
            <RightSidebar />
          </div>
        </div>
      </div>
    </DispatcherContext.Provider>
  );
};

const rootElement = document.getElementById("root");
render(<App />, rootElement);

// <DOING>
// TODO : Add drag and drop
// </DOING>

// <DONE>

// TODO : Add auto-save and persist data through refreshs on browser
// TODO : Add export to JSON functionality with https://github.com/kennethjiang/js-file-download
// TODO : CHange initial state
// TODO : Focus title on first mount.
// TODO : Add unmount and mount listitem animations
// TODO: Refactor renderListItems function to ListItems component
// TODO : Add scrollbar for list container -- used simplebar
// TODO : Make it usable on mobile.
// TODO : Add clear list button in right sidebar that clears state and focuses title
// TODO : Decide what share functionality should look like. (Firebase vs Amplify vs FaunaDB)
// TODO : Add share functionality 1 : Add share button next to export button
// TODO : Add share functionality 2 : Add loading state to share button with dynamic text (saving-authenticating)
// TODO : Add share functionality 3 : When share button is clicked it goes to loading state then
// imports firebase, does an anonymous sign-in with it and pushes to lists table.

// </DONE>
