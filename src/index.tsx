import * as React from "react";
import download from "js-file-download";

import "./styles.css";
// import "./icons.css";
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

const App = ({ initialState = getInitialState() }) => {
  const [state, dispatch] = React.useReducer(
    withLogger(withFirebaseUpdate(withLocalStorageUpdate(reducer))),
    { ...getInitialState(), ...initialState }
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
export { App };
