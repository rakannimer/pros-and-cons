import * as React from "react";
import { DispatcherContext } from "../state/DispatcherContext";
import { observer } from "mobx-react-lite";

export const RightSidebar = observer(({}) => {
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
});
