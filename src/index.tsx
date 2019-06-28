import * as React from "react";
import { render } from "react-dom";

import "./styles.css";
import { range } from "./utils";

function ListItem() {
  return (
    <div className="list-item-container">
      <div
        className="argument-description-container"
        onInput={ev => {
          console.log("Value is ", ev.currentTarget.innerText);
        }}
        contentEditable
      >
        Lorem Ipsum Dorum jhjhjhsdsdsdsds
      </div>
      <div className="argument-weight-container">
        <select>
          {range(1, 10).map(w => (
            <option key={w}>{w}</option>
          ))}
        </select>
      </div>
      <div className="argument-delete-container">
        <div>x</div>
      </div>
    </div>
  );
}

function App() {
  return (
    <div className="app-container">
      <div className="left-sidebar">
        <div className="left-sidebar-home-button">H</div>
      </div>
      <div className="app-without-left-sidebar">
        <div className="app-header">PROS & CONS</div>
        <div className="title-and-share-container">
          <div className="title-container">Lorem Ipsum</div>
          <div className="share-button-container">
            Share
            <div>+</div>
          </div>
        </div>
        <div className="pros-and-cons-and-right-sidebar">
          <div className="pros-and-cons-container">
            <div className="list">
              <div className="list-title">PROS</div>
              <div className="list-items-and-footer">
                <div className="list-items">
                  <ListItem />
                  <ListItem />
                </div>
                <div className="list-footer">
                  <div className="add-argument-button">
                    <div>icon</div>
                    <div>Add</div>
                  </div>
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
                  <div className="add-argument-button">
                    <div>icon</div>
                    <div>Add</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="right-sidebar">Sidebar</div>
        </div>
      </div>
    </div>
  );
}

const rootElement = document.getElementById("root");
render(<App />, rootElement);
