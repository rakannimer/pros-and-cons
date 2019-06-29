import * as React from "react";
import { render } from "react-dom";

import "./styles.css";
import "./icons.css";
import { range } from "./utils";

function ListItem() {
  return (
    <div className="list-item-container">
      <div className="argument-description-container">
        <div
          className="description"
          onInput={ev => {
            console.log("Value is ", ev.currentTarget.innerText);
          }}
          contentEditable
        >
          Lorem Ipsum Dorum Lorem Ipsum Dorum Lorem Ipsum Dorum
        </div>
      </div>
      <div className="weight-and-hint">
        <div className="argument-weight-container">
          <select>
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

function AddArgumentButton() {
  return (
    <div className="add-argument-button-container">
      <button className="add-argument-button">
        <div className="icon-plus" />
        <div className="space" />
        <div className="text">Add</div>
      </button>
    </div>
  );
}

function App() {
  return (
    <div className="app-container">
      <div className="left-sidebar">
        <div className="home-button">
          <div className="icon-home" />
        </div>
      </div>
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
              <div className="list-title">PROS</div>
              <div className="list-items-and-footer">
                <div className="list-items">
                  {range(1, 4).map(i => (
                    <ListItem key={i} />
                  ))}
                </div>
                <div className="list-footer">
                  <AddArgumentButton />
                </div>
              </div>
            </div>

            <div className="list">
              <div className="list-title">CONS</div>
              <div className="list-items-and-footer">
                <div className="list-items">
                  <ListItem />
                  <ListItem />
                </div>
                <div className="list-footer">
                  <AddArgumentButton />
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
