import * as React from "react";
import { Dispatcher } from "../types";
import { DispatcherContext } from "../DispatcherContext";

export const RightSidebar = ({}) => {
  const dispatch = React.useContext(DispatcherContext);
  return (
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
  );
};
