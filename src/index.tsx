import * as React from "react";
import { render } from "react-dom";

import "./styles.css";
import "./icons.css";

import "simplebar/dist/simplebar.css";

import { INITIAL_STATE } from "./initial-state";
import { reducer } from "./reducer";
import { LeftSidebar, List, Header } from "./components";

let App = () => {
  const [state, dispatch] = React.useReducer(reducer, INITIAL_STATE);
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
        <Header title={state.title} dispatch={dispatch} />
        <div className="pros-and-cons-and-right-sidebar">
          <div className="pros-and-cons-container">
            <List
              winner={state.winner}
              arguments={state.pros}
              dispatch={dispatch}
              title="PROS"
              type="pros"
            />
            <List
              winner={state.winner}
              arguments={state.cons}
              dispatch={dispatch}
              title="CONS"
              type="cons"
            />
          </div>
          <div className="right-sidebar">
            <div className="app-name">Pros & Cons</div>
            <div className="app-description">
              Struggling with a decision ? <br />
              <br /> Weigh the tradeoffs here.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const rootElement = document.getElementById("root");
render(<App />, rootElement);
