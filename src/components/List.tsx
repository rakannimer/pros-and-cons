import * as React from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";

import "simplebar"; // or "import SimpleBar from 'simplebar';" if you want to use it manually.
import "simplebar/dist/simplebar.css";
//@ts-ignore
import SimpleBar from "simplebar-react";
import { AddArgumentButton } from "./AddArgumentButton";
import { State, Argument } from "../types";
import { ListItem } from "./ListItem";
import { DispatcherContext } from "../state/DispatcherContext";

const ListItems = React.memo(
  ({
    args, // dispatch,
    withDraggable = true
  }: {
    args: Argument[]; // dispatch: React.Dispatch<Action>;
    withDraggable: boolean;
  }) => {
    const dispatch = React.useContext(DispatcherContext);
    return (
      <React.Fragment>
        <SimpleBar style={{ height: "60vh" }}>
          {args.map((arg, index) => {
            // const arg = args[argId];
            return !withDraggable ? (
              <ListItem argument={arg} key={arg.id} />
            ) : (
              <Draggable key={arg.id} draggableId={arg.id} index={index}>
                {(provided, snapshot) => (
                  <ListItem
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    //@ts-ignore
                    ref={provided.innerRef}
                    argument={arg}
                    key={arg.id}
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

export const List = React.memo(
  ({
    winner,
    arguments: args,
    type,
    title
  }: {
    arguments: State["pros"];
    winner: State["winner"];
    title: string;
    type: State["winner"];
  }) => {
    const dispatch = React.useContext(DispatcherContext);
    return (
      <div className="list">
        <div className={`list-title ${winner === type ? "text-glow" : ""}`}>
          {title}
        </div>
        <div className="list-items-and-footer">
          <div
            style={{
              position: "relative",
              height: "60vh",
              overflowY: "auto"
            }}
          >
            <ListItems args={args} withDraggable={false} />
          </div>
        </div>

        <div className="list-footer">
          <AddArgumentButton
            dispatch={dispatch}
            type={type.slice(0, type.length - 1) as "pro" | "con"}
          />
        </div>
      </div>
    );
  }
  // ,(prevProps, props) =>
  //   prevProps.arguments === props.arguments && prevProps.winner === props.winner
);
