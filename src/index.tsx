import * as React from "react";
import { render } from "react-dom";
import {
  DropResult,
  ResponderProvided,
  DragDropContext
} from "react-beautiful-dnd";
import * as db from "idb-keyval";
import download from "js-file-download";

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

const ProsAndCons = (
  props: Pick<State, "pros" | "cons" | "winner"> & {
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
          dispatch={dispatch}
          title="PROS"
          type="pros"
        />
        <List
          winner={winner}
          arguments={cons}
          dispatch={dispatch}
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

let App = () => {
  const [state, dispatch] = React.useReducer(
    withLocalStorage(reducer),
    INITIAL_STATE
  );
  React.useEffect(() => {
    // download("hi", "data.csv");
    db.get<State>("offline-list").then(v => {
      //dispatch({ type: "hydrate", payload: v });
    });
  }, []);
  const downloadAsJson = () => {
    download(JSON.stringify(state, undefined, 2), "pros-and-cons-list.json");
  };
  const pros = state.pros;
  const cons = state.cons;

  React.useEffect(() => {
    const prosScore = pros.reduce((acc, cur) => {
      acc += cur.weight;
      return acc;
    }, 0);
    const consScore = cons.reduce((acc, cur) => {
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
    <div className="app-container">
      <LeftSidebar />
      <div className="app-without-left-sidebar">
        <Header
          title={state.title}
          dispatch={dispatch}
          downloadAsJson={downloadAsJson}
        />
        <div className="pros-and-cons-and-right-sidebar">
          <ProsAndCons {...state} dispatch={dispatch} />
          <div className="right-sidebar">
            <div className="app-name">Pros & Cons</div>
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
