import * as React from "react";

import { List } from ".";
import { onDragEndCreate, DragDropContext } from "../utils";
import { DispatcherContext } from "../state/DispatcherContext";

export const ProsAndCons = () => {
  const dispatch = React.useContext(DispatcherContext);
  const onDragStart = () => {};
  return (
    <div className="pros-and-cons-container">
      <DragDropContext
        onDragEnd={onDragEndCreate(dispatch)}
        onDragStart={onDragStart}
      >
        <List title="PROS" type="pros" />
        <List title="CONS" type="cons" />
      </DragDropContext>
    </div>
  );
};
