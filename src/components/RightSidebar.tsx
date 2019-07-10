import * as React from "react";
import { DispatcherContext } from "../state/DispatcherContext";

export const RightSidebar = ({}) => {
  const dispatch = React.useContext(DispatcherContext);
  return (
    <div className="right-sidebar">
      <div className="app-name">Pros & Cons</div>
      <div className="app-description">
        <div>Struggling with a decision ? </div>
        <div> Weigh the tradeoffs here.</div>
      </div>
      <div style={{ marginTop: "20px", borderRadius: "10px" }}>
        <button
          aria-label={"Clear all data"}
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
