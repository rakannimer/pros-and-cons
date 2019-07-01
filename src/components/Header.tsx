import * as React from "react";

import { TextArea } from "./TextArea";
import { Action } from "../types";

export const Header = React.memo(
  ({
    title,
    dispatch
  }: {
    title: string;
    dispatch: React.Dispatch<Action>;
  }) => {
    return (
      <>
        <div className="app-header">PROS & CONS</div>
        <div className="title-and-share-container">
          <div className="title-container">
            <TextArea
              onChange={title => {
                dispatch({ type: "set-title", payload: { title } });
              }}
              value={title}
            />
          </div>
          <div className="share-button-container">
            <button className="share-button">
              <div>Export</div>
              <div className="share-separator" />
              <div className="icon-plus" />
            </button>
          </div>
        </div>
      </>
    );
  }
);
