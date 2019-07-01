import * as React from "react";
import autosize from "autosize";

//@ts-ignore
import SimpleBar from "simplebar-react";

import { range, uid } from "../utils";
import { Action, Argument, State } from "../types";

export const TextArea: React.ComponentType<{
  onChange?: (v: string) => void;
}> = ({ children, onChange = () => {} }) => {
  const textAreaRef = React.useRef<HTMLTextAreaElement | null>(null);
  React.useEffect(() => {
    if (textAreaRef.current === null) return;
    autosize(textAreaRef.current);
  }, []);
  return (
    <textarea
      ref={ref => (textAreaRef.current = ref)}
      onChange={ev => {
        onChange(ev.target.value);
      }}
      value={`${children}`}
    />
  );
};

export const ListItem = React.memo(
  ({
    argument,
    dispatch
  }: {
    argument: Argument;
    dispatch: React.Dispatch<Action>;
  }) => {
    return (
      <div key={argument.id} className="list-item-container">
        <div className="argument-description-container">
          <div className="description">
            <TextArea
              onChange={v => {
                dispatch({
                  type: "edit-argument",
                  payload: {
                    argument: {
                      ...argument,
                      text: String(v)
                    }
                  }
                });
              }}
            >
              {argument.text}
            </TextArea>
          </div>
        </div>
        <div className="weight-and-hint">
          <div className="argument-weight-container">
            <select
              defaultValue={`${argument.weight}`}
              onChange={ev => {
                dispatch({
                  type: "edit-argument",
                  payload: {
                    argument: {
                      ...argument,
                      weight: Number(ev.target.value)
                    }
                  }
                });
              }}
            >
              {range(1, 10).map(w => (
                <option key={w}>{w}</option>
              ))}
            </select>
            <div className="select-open-icon-container">
              <div className="icon-down-open" />
            </div>
          </div>
          <div className="hint">Set importance</div>
        </div>
        <button
          className="argument-delete-container"
          onClick={() => {
            dispatch({
              type: "delete-argument",
              payload: {
                argument: {
                  id: argument.id,
                  type: argument.type
                }
              }
            });
          }}
        >
          <div className="icon-cancel-circled-outline" />
        </button>
      </div>
    );
  }
);

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

export const LeftSidebar = React.memo(() => (
  <div className="left-sidebar">
    <div className="home-button">
      <div className="icon-home" />
    </div>
  </div>
));

export const Header = React.memo(
  ({
    title,
    dispatch
  }: {
    title: string;
    dispatch: React.Dispatch<Action>;
  }) => {
    return (
      <>
        <div className="app-header">PROS & CONS</div>
        <div className="title-and-share-container">
          <div className="title-container">
            <TextArea
              onChange={title => {
                dispatch({ type: "set-title", payload: { title } });
              }}
            >
              {title}
            </TextArea>
          </div>
          <div className="share-button-container">
            <button className="share-button">
              <div>Export</div>
              <div className="share-separator" />
              <div className="icon-plus" />
            </button>
          </div>
        </div>
      </>
    );
  }
);

export const List = React.memo(
  ({
    winner,
    arguments: pros,
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
          <SimpleBar style={{ height: "60vh" }}>
            {pros.map(pro => (
              <ListItem argument={pro} key={pro.id} dispatch={dispatch} />
            ))}
          </SimpleBar>
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
