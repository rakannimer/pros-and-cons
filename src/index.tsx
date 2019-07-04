import * as React from "react";
import { render } from "react-dom";
import {
  DropResult,
  ResponderProvided,
  DragDropContext
} from "react-beautiful-dnd";
import * as db from "idb-keyval";
import download from "js-file-download";
import memoize from "memoize-one";
import useThunkReducer from "react-hook-thunk-reducer";
import { createBrowserHistory } from "history";
// TODO : Decide what share functionality should look like. (Firebase vs Amplify vs FaunaDB)
// TODO : Add share functionality 1 : Add share button next to export button
// TODO : Add share functionality 2 : Add loading state to share button with dynamic text (saving-authenticating)
// TODO : Add share functionality 3 : When share button is clicked it goes to loading state then
// imports firebase, does an anonymous sign-in with it and pushes to lists table.
// It then appends the id to the current url and displays it in a small modal with a message.
// TODO : Add modal to be displayed when sharing

// <DOING>

// </DOING>

// <DONE>
// TODO : Add export to JSON functionality with https://github.com/kennethjiang/js-file-download
// TODO : Add auto-save and persist data through refreshs (add middleware to the reducer that saves state using idb-keyval and returns it without waiting to finish)
// TODO : CHange initial state
// TODO : Focus title on first mount.
// TODO : Add unmount and mount listitem animations
// TODO: Refactor renderListItems function to ListItems component
// TODO : Add scrollbar for list container -- used simplebar
// TODO : Make it usable on mobile.
// TODO : Add clear list button in right sidebar that clears state and focuses title

// </DONE>

import "./styles.css";
import "./icons.css";
import "animate.css/animate.min.css";

import { INITIAL_STATE } from "./initial-state";
import { reducer } from "./reducer";
import { List, LeftSidebar, Header } from "./components";
import { State, Action } from "./types";

const getHistory = memoize(
  () => {
    return createBrowserHistory();
  },
  () => true
);

const ProsAndCons = (
  props: Pick<
    State,
    "pros" | "cons" | "winner" | "pros_keys_order" | "cons_keys_order"
  > & {
    dispatch: React.Dispatch<Action>;
  }
) => {
  const { dispatch, winner, pros, cons } = props;
  const onDragStart = () => {};
  const onDragEnd = (result: DropResult, provided: ResponderProvided) => {
    const sourceIndex = result.source.index;
    const destinationIndex = result.destination && result.destination.index;
    const sourceId = result.source.droppableId;
    const destinationId = result.destination && result.destination.droppableId;
    if (destinationId === undefined || destinationIndex === undefined) return;
    if (destinationId === sourceId) {
      const listType = sourceId === "pros" ? "pros" : "cons";
      dispatch({
        type: "reorder-list",
        payload: {
          listType,
          endIndex: destinationIndex,
          startIndex: sourceIndex
        }
      });
    } else {
      const startListType = sourceId === "pros" ? "pros" : "cons";
      const endListType = destinationId === "pros" ? "pros" : "cons";
      dispatch({
        type: "move-to-list",
        payload: {
          startListType,
          endListType,
          endIndex: destinationIndex,
          startIndex: sourceIndex
        }
      });
    }
  };
  const containerRef = React.useRef<null | HTMLDivElement>(null);

  return (
    <div className="pros-and-cons-container" ref={containerRef}>
      <DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStart}>
        <List
          winner={winner}
          arguments={pros}
          argsIds={props.pros_keys_order}
          dispatch={dispatch}
          title="PROS"
          type="pros"
        />
        <List
          winner={winner}
          arguments={cons}
          dispatch={dispatch}
          argsIds={props.cons_keys_order}
          title="CONS"
          type="cons"
        />
      </DragDropContext>
    </div>
  );
};
const withLocalStorage = (reducer: React.Reducer<State, Action>) => {
  const newReducer = (state: State, action: Action) => {
    const newState = reducer(state, action);
    db.set("offline-list", newState);
    return newState;
  };
  return newReducer;
};

const getFirebase = memoize(
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
import { useAsyncEffect } from "use-async-effect";
const withFirebaseStorage = (reducer: React.Reducer<State, Action>) => {
  const newReducer = (state: State, action: Action) => {
    const newState = reducer(state, action);
    return newState;
  };
};

let App = () => {
  const history = getHistory();
  const hasIdInUrl = history.location.pathname !== "/";
  const idInUrl = history.location.pathname.substr(
    1,
    history.location.pathname.length
  );
  console.log({ idInUrl });
  const [state, dispatch] = useThunkReducer<State, Action>(
    withLocalStorage(reducer),
    {
      ...INITIAL_STATE,
      hasIdInUrl,
      idInUrl
    }
  );
  React.useEffect(() => {
    const unlisten = history.listen((location, action) => {
      const hasIdInUrl = history.location.pathname !== "/";
      const idInUrl = history.location.pathname.substr(
        1,
        history.location.pathname.length
      );
      dispatch({
        type: "update-url",
        payload: {
          hasIdInUrl,
          idInUrl
        }
      });
    });
    return unlisten;
  }, []);

  React.useEffect(() => {
    db.get<State>("offline-list").then(v => {
      //dispatch({ type: "hydrate", payload: v });
    });
  }, []);
  let listeners = [];

  useAsyncEffect(async () => {
    if (idInUrl === "") {
      return;
    }
    console.warn(`Checking if ${idInUrl} is in firebase database`);
    const firebase = await getFirebase();
    const isAuthed = firebase.auth().currentUser !== null;
    if (!isAuthed) {
      await firebase.auth().signInAnonymously();
    }

    const titleSnapshot = await firebase
      .app()
      .database()
      .ref(`/sessions/${idInUrl}/title`)
      .once("value");
    const title = titleSnapshot.val();
    if (title === null) {
      await firebase
        .app()
        .database()
        .ref(`/sessions/${idInUrl}/`)
        .update(state);
    }
    firebase
      .app()
      .database()
      .ref(`/sessions/${idInUrl}/pros_keys_order`)
      .on("value", () => {
        // dispatch()
      });
    // if (id)
    // 1 - Check if sessions/id exists
    // 2 - If it doesnt create it from local state
    // 3 - If it does listen to pros_keys_order and cons_keys_order and change them in state accordingly
    // 4 - For every key in pros_keys_order listen to sessions/{id}/pros/{key} and change them in state accordingly
  }, [state.idInUrl]);
  const downloadAsJson = () => {
    download(JSON.stringify(state, undefined, 2), "pros-and-cons-list.json");
  };
  const pros = state.pros;
  const cons = state.cons;

  React.useEffect(() => {
    const prosScore = state.pros_keys_order.reduce((acc, cur) => {
      acc += state.pros[cur].weight;
      return acc;
    }, 0);
    const consScore = state.cons_keys_order.reduce((acc, cur) => {
      acc += state.cons[cur].weight;
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
    <div className="app-container">
      <LeftSidebar />
      <div className="app-without-left-sidebar">
        <Header
          title={state.title}
          isLive={state.isLive}
          dispatch={dispatch}
          downloadAsJson={downloadAsJson}
        />
        <div className="pros-and-cons-and-right-sidebar">
          <ProsAndCons {...state} dispatch={dispatch} />
          <div className="right-sidebar">
            <div className="app-name">Pros & Cons</div>
            {/* <a
              href="/abcd"
              onClick={event => {
                event.preventDefault();
                history.push("/abcd");
              }}
            >
              abcd
            </a> */}
            <div className="app-description">
              Struggling with a decision ? <br />
              <br /> Weigh the tradeoffs here.
            </div>
            <div style={{ marginTop: "20px", borderRadius: "10px" }}>
              <button
                style={{
                  borderRadius: "10px",
                  padding: 10,
                  width: "80%",
                  background: "inherit",
                  color: "var(--white)"
                }}
                onClick={() => {
                  dispatch({ type: "clear-list" });
                }}
              >
                Clear
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const rootElement = document.getElementById("root");
render(<App />, rootElement);
