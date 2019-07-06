import * as React from "react";

import { List } from ".";
import { State } from "../types";
import { onDragEndCreate, DragDropContext } from "../utils";
import { DispatcherContext } from "../state/DispatcherContext";

export const ProsAndCons = (props: Pick<State, "pros" | "cons" | "winner">) => {
  const dispatch = React.useContext(DispatcherContext);
  const { winner, pros, cons } = props;
  const onDragStart = () => {};
  return (
    <div className="pros-and-cons-container">
      <DragDropContext
        onDragEnd={onDragEndCreate(dispatch)}
        onDragStart={onDragStart}
      >
        <List winner={winner} arguments={pros} title="PROS" type="pros" />
        <List winner={winner} arguments={cons} title="CONS" type="cons" />
      </DragDropContext>
    </div>
  );
};
