import * as React from "react";
import { render } from "react-dom";
import * as db from "idb-keyval";
import download from "js-file-download";

// TODO : Add auto-save and persist data through refreshs on browser

// <DOING>

// </DOING>

// <DONE>
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
// TODO : Add modal to be displayed when sharing
// </DONE>

import "./styles.css";
import "./icons.css";
import "animate.css/animate.min.css";

import { INITIAL_STATE, getInitialState } from "./initial-state";
import { reducer } from "./reducer";
import { List, LeftSidebar, Header, RightSidebar } from "./components";
import { State, Action, Dispatcher } from "./types";

const ProsAndCons = (props: Pick<State, "pros" | "cons" | "winner">) => {
  const dispatch = React.useContext(DispatcherContext);
  const { winner, pros, cons } = props;
  const onDragStart = () => {};

  return (
    <div className="pros-and-cons-container">
      <DragDropContext
        onDragEnd={onDragEndCreate(dispatch)}
        onDragStart={onDragStart}
      >
        <List winner={winner} arguments={pros} title="PROS" type="pros" />
        <List winner={winner} arguments={cons} title="CONS" type="cons" />
      </DragDropContext>
    </div>
  );
};
// const withLocalStorage = (reducer: React.Reducer<State, Action>) => {
//   const newReducer = (state: State, action: Action) => {
//     const newState = reducer(state, action);
//     db.set("offline-list", newState);
//     return newState;
//   };
//   return newReducer;
// };

import { useAsyncEffect } from "use-async-effect";
import {
  initializeFirebase,
  mapHistoryToState,
  onDragEndCreate,
  DragDropContext,
  withFirebaseStorage,
  withLocalStorage,
  getHistory
} from "./utils";
import { DispatcherContext } from "./DispatcherContext";

let App = () => {
  const [state, dispatch] = React.useReducer(
    withFirebaseStorage(withLocalStorage(reducer)),
    getInitialState()
  );

  React.useEffect(() => mapHistoryToState(dispatch), []);
  React.useEffect(() => {
    // if (state.idInUrl === "") {
    //   db.get<State>("offline-list").then(v => {
    //     console.log("hydrating from ", v);
    //     dispatch({ type: "hydrate", payload: v });
    //   });
    // } else {
    //   db.get<State>(state.idInUrl).then(v => {
    //     console.log("hydrating from ", v);
    //     dispatch({ type: "hydrate", payload: v });
    //   });
    // }
  }, [state.idInUrl]);

  React.useEffect(() => {
    initializeFirebase(state.idInUrl, dispatch, state);
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
