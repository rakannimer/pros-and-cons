import * as React from "react";
import { render } from "react-dom";

import "./styles.css";
import "./icons.css";
import { range, uid } from "./utils";
import { Action, Argument } from "./types";
import { INITIAL_STATE } from "./initial-state";
import { reducer } from "./reducer";

function ListItem({
  argument,
  dispatch
}: {
  argument: Argument;
  dispatch: React.Dispatch<Action>;
}) {
  return (
    <div className="list-item-container">
      <div className="argument-description-container">
        <div
          className="description"
          onInput={ev => {
            dispatch({
              type: "edit-argument",
              payload: {
                argument: {
                  ...argument,
                  text: String(ev.currentTarget.textContent)
                }
              }
            });
          }}
          contentEditable
          suppressContentEditableWarning
        >
          {argument.text}
        </div>
      </div>
      <div className="weight-and-hint">
        <div className="argument-weight-container">
          <select defaultValue={`${argument.weight}`}>
            {range(1, 10).map(w => (
              <option key={w}>{w}</option>
            ))}
          </select>
          <div className="select-open-icon-container">
            <div className="icon-down-open" />
          </div>
        </div>
        <div className="hint">Set importance</div>
      </div>
      <button
        className="argument-delete-container"
        onClick={() => console.log("Hi")}
      >
        <div className="icon-cancel-circled-outline" />
      </button>
    </div>
  );
}

function AddArgumentButton({ onClick = () => {} }) {
  return (
    <div className="add-argument-button-container">
      <button className="add-argument-button" onClick={onClick}>
        <div className="icon-plus" />
        <div className="space" />
        <div className="text">Add</div>
      </button>
    </div>
  );
}

const LeftSidebar = () => (
  <div className="left-sidebar">
    <div className="home-button">
      <div className="icon-home" />
    </div>
  </div>
);

function App() {
  const [state, dispatch] = React.useReducer(reducer, INITIAL_STATE);
  const pros = Object.keys(state.arguments)
    .filter(argumentId => state.arguments[argumentId].type === "pro")
    .map(argumentId => state.arguments[argumentId]);
  const cons = Object.keys(state.arguments)
    .filter(argumentId => state.arguments[argumentId].type === "con")
    .map(argumentId => state.arguments[argumentId]);

  React.useEffect(() => {}, []);
  return (
    <div className="app-container">
      <LeftSidebar />
      <div className="app-without-left-sidebar">
        <div className="app-header">PROS & CONS</div>
        <div className="title-and-share-container">
          <div className="title-container">Lorem Ipsum</div>
          <div className="share-button-container">
            <button className="share-button">
              <div>Export</div>
              <div className="share-separator" />
              <div className="icon-plus" />
            </button>
          </div>
        </div>
        <div className="pros-and-cons-and-right-sidebar">
          <div className="pros-and-cons-container">
            <div className="list">
              <div className="list-title text-glow">PROS</div>
              <div className="list-items-and-footer">
                <div className="list-items">
                  {pros.map(pro => (
                    <ListItem argument={pro} key={pro.id} dispatch={dispatch} />
                  ))}
                </div>
                <div className="list-footer">
                  <AddArgumentButton
                    onClick={() => {
                      dispatch({
                        type: "add-argument",
                        payload: {
                          argument: {
                            id: uid(),
                            text: "",
                            weight: 1,
                            type: "pro"
                          }
                        }
                      });
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="list">
              <div className="list-title">CONS</div>
              <div className="list-items-and-footer">
                <div className="list-items">
                  {cons.map(con => (
                    <ListItem argument={con} key={con.id} dispatch={dispatch} />
                  ))}
                </div>
                <div className="list-footer">
                  <AddArgumentButton
                    onClick={() => {
                      dispatch({
                        type: "add-argument",
                        payload: {
                          argument: {
                            id: uid(),
                            text: "",
                            weight: 1,
                            type: "con"
                          }
                        }
                      });
                    }}
                  />
                </div>
              </div>
            </div>
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
}

const rootElement = document.getElementById("root");
render(<App />, rootElement);
