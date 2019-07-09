import * as React from "react";
import { render } from "react-dom";
import download from "js-file-download";

import "./styles.css";
import "./icons.css";
import "animate.css/animate.min.css";

import { getInitialState } from "./state/initial-state";
import { reducer } from "./state/reducer";
import { LeftSidebar, Header, RightSidebar } from "./components";
import * as effects from "./effects";
import { DispatcherContext } from "./state/DispatcherContext";
import { ProsAndCons } from "./components/ProsAndCons";
import { withFirebaseUpdate } from "./higher-order-reducers/firebase";
import { withLocalStorageUpdate } from "./higher-order-reducers/indexed-db";
import { withLogger } from "./higher-order-reducers/logger";
import * as serviceWorker from "./serviceWorker";

let App = () => {
  const [state, dispatch] = React.useReducer(
    withLogger(withFirebaseUpdate(withLocalStorageUpdate(reducer))),
    getInitialState()
  );

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
    effects.listenToRemoteState.effect(dispatch, state),
    effects.listenToRemoteState.dependencies(state)
  );

  React.useEffect(
    effects.setInitialFirebaseState.effect(dispatch, state),
    effects.setInitialFirebaseState.dependencies(state)
  );

  function downloadAsJson() {
    download(JSON.stringify(state, null, 2), "pros-and-cons-list.json");
  }

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

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA

serviceWorker.register({
  onUpdate: registration => {
    console.warn("onUpdate");
  },
  onSuccess: registration => {
    console.warn("onSuccess");
  }
});

// <DOING>
// TODO : Add service worker and make it a PWA
// </DOING>
//
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
