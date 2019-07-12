import * as React from "react";

import { uid } from "../utils";
import { DispatcherContext } from "../state/DispatcherContext";

export const AddArgumentButton = React.memo(
  ({ type }: { type: "pro" | "con" }) => {
    const dispatch = React.useContext(DispatcherContext);
    return (
      <div className="add-argument-button-container">
        <button
          aria-label="Add argument"
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
