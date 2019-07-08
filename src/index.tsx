import * as React from "react";
import { render } from "react-dom";
import download from "js-file-download";
import { observer } from "mobx-react-lite";

import "./styles.css";
import "./icons.css";
import "animate.css/animate.min.css";

import { getInitialState } from "./state/initial-state";
import { reducer, getSerializedState, state } from "./state/index";
import { LeftSidebar, Header, RightSidebar } from "./components";
import * as effects from "./effects";
import { DispatcherContext } from "./state/DispatcherContext";
import { ProsAndCons } from "./components/ProsAndCons";
import { withFirebaseUpdate } from "./higher-order-reducers/firebase";
import { withLocalStorageUpdate } from "./higher-order-reducers/indexed-db";
import { getFirebase } from "./utils";

let App = observer(() => {
  const [s, dispatch] = React.useReducer(
    withFirebaseUpdate(withLocalStorageUpdate(reducer)),
    getInitialState()
  );

  const [firebase, setFirebase] = React.useState<
    undefined | typeof import("firebase")
  >(undefined);

  React.useEffect(
    effects.mapHistoryToState.effect(dispatch, state),
    effects.mapHistoryToState.dependencies(state)
  );

  // Hydrate from cache
  React.useEffect(
    effects.hydrateFromCache.effect(dispatch, state),
    effects.hydrateFromCache.dependencies(state)
  );

  // Auth
  React.useEffect(
    effects.authWithFirebase.effect(dispatch, state),
    effects.authWithFirebase.dependencies(state)
  );

  React.useEffect(
    effects.listenToRemoteState.effect(dispatch, state, firebase),
    effects.listenToRemoteState.dependencies(state, firebase)
  );

  React.useEffect(
    effects.setInitialFirebaseState.effect(dispatch, state),
    effects.setInitialFirebaseState.dependencies(state)
  );

  React.useEffect(() => {
    getFirebase().then(f => {
      setFirebase(f);
    });
  }, []);
  React.useEffect(() => {
    console.warn("Firebase : ", firebase);
  }, [firebase]);
  function downloadAsJson() {
    download(
      JSON.stringify(getSerializedState(), null, 2),
      "pros-and-cons-list.json"
    );
  }
  // const pros = state.pros;
  // const cons = state.cons;

  React.useEffect(
    effects.computeWinner.effect(dispatch, state),
    effects.computeWinner.dependencies(state)
  );

  return (
    <DispatcherContext.Provider value={dispatch}>
      <div className="app-container">
        <LeftSidebar />
        <div className="app-without-left-sidebar">
          <Header
            idInUrl={state.idInUrl.get()}
            title={state.title.get()}
            downloadAsJson={downloadAsJson}
          />
          <div className="pros-and-cons-and-right-sidebar">
            <ProsAndCons />
            <RightSidebar />
          </div>
        </div>
      </div>
    </DispatcherContext.Provider>
  );
});

const rootElement = document.getElementById("root");
render(<App />, rootElement);

// <DOING>

// </DOING>
//
// <DONE>
// TODO : Update colors from psd file
// TODO : Sync with mobx branch
// TODO : Move higher-order-reducers functionality to effects - Doesn't work for granular updates like edit-argument, add-argument, delete-argument. We could do update the whole data remotely but seems wrong
// TODO : Move effects to separate file
// TODO : Add drag and drop
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
