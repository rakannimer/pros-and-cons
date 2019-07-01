import * as React from "react";

import { uid } from "../utils";
import { Action } from "../types";

export const AddArgumentButton = React.memo(
  ({
    dispatch,
    type
  }: {
    dispatch: React.Dispatch<Action>;
    type: "pro" | "con";
  }) => {
    return (
      <div className="add-argument-button-container">
        <button
          className="add-argument-button"
          onClick={() => {
            dispatch({
              type: "add-argument",
              payload: {
                argument: {
                  id: uid(),
                  text: "",
                  weight: 1,
                  type
                }
              }
            });
          }}
        >
          <div className="icon-plus" />
          <div className="space" />
          <div className="text">Add</div>
        </button>
      </div>
    );
  }
);
