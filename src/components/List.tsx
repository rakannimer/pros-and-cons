import * as React from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { observer } from "mobx-react-lite";
import SimpleBar from "simplebar-react";
import "simplebar"; // or "import SimpleBar from 'simplebar';" if you want to use it manually.
import "simplebar/dist/simplebar.css";

import { AddArgumentButton } from "./AddArgumentButton";
import { ListItem } from "./ListItem";
import { state } from "../state/index";

const ListItems = observer(
  ({
    withDraggable = true,
    type
  }: {
    withDraggable: boolean;
    type: "pros" | "cons";
  }) => {
    const args = state[type];
    return (
      <React.Fragment>
        <SimpleBar style={{ height: "60vh" }}>
          {args.map((arg, index) => {
            const argId = arg.id.get();
            return !withDraggable ? (
              <ListItem key={argId} argument={arg} />
            ) : (
              <Draggable key={argId} draggableId={argId} index={index}>
                {(provided, snapshot) => (
                  <ListItem
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                    argument={arg}
                    key={argId}
                  />
                )}
              </Draggable>
            );
          })}
        </SimpleBar>
      </React.Fragment>
    );
  }
);

export const List = observer(
  ({ type, title }: { title: string; type: "pros" | "cons" }) => {
    const winner = state.winner.get();
    return (
      <div className="list">
        <div className={`list-title ${winner === type ? "text-glow" : ""}`}>
          {title}
        </div>
        <div className="list-items-and-footer">
          <Droppable droppableId={type}>
            {(provided, snapshot) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                style={{
                  position: "relative",
                  height: "60vh",
                  overflow: "hidden"
                }}
              >
                <ListItems withDraggable={true} type={type} />
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>

        <div className="list-footer">
          <AddArgumentButton
            type={type.slice(0, type.length - 1) as "pro" | "con"}
          />
        </div>
      </div>
    );
  }
);
