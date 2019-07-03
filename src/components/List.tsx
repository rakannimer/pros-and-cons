import * as React from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";

import { AddArgumentButton } from "./AddArgumentButton";
import { Action, State, Argument } from "../types";
import { ListItem } from "./ListItem";
import { LazyScrollBar } from "./LazyScrollBar";

const ListItems = React.memo(
  ({
    args,
    dispatch,
    withDraggable = true
  }: {
    args: Argument[];
    dispatch: React.Dispatch<Action>;
    withDraggable: boolean;
  }) => {
    return (
      <React.Fragment>
        {args.map((arg, index) =>
          !withDraggable ? (
            <ListItem argument={arg} key={arg.id} dispatch={dispatch} />
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
                  dispatch={dispatch}
                />
              )}
            </Draggable>
          )
        )}
      </React.Fragment>
    );
  }
);

export const List = React.memo(
  ({
    winner,
    arguments: args,
    dispatch,
    type,
    title
  }: {
    arguments: State["pros"];
    winner: State["winner"];
    title: string;
    type: State["winner"];
    dispatch: React.Dispatch<Action>;
  }) => {
    return (
      <div className="list">
        <div className={`list-title ${winner === type ? "text-glow" : ""}`}>
          {title}
        </div>
        <div className="list-items-and-footer">
          <React.Suspense
            fallback={
              <div
                style={{
                  position: "relative",
                  height: "60vh",
                  overflow: "hidden"
                }}
              >
                <ListItems
                  args={args}
                  dispatch={dispatch}
                  withDraggable={false}
                />
              </div>
            }
          >
            <LazyScrollBar
              style={{
                height: "60vh",
                position: "relative",
                overflow: "auto"
              }}
            >
              <ListItems
                args={args}
                dispatch={dispatch}
                withDraggable={false}
              />
              {/* <Droppable droppableId={type}>
                {provided => (
                  <div ref={provided.innerRef} {...provided.droppableProps}>
                    {renderListItems(args, dispatch, true)}
                  </div>
                )}
              </Droppable> */}
              {/* </LazyScrollBar> */}
            </LazyScrollBar>
          </React.Suspense>
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
);
