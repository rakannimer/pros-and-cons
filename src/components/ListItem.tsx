import * as React from "react";

import { TextArea } from "./TextArea";
import { range } from "../utils";
import { Action, Argument } from "../types";

export const ListItem = React.forwardRef(
  (
    {
      argument,
      dispatch,
      ...rest
    }: {
      argument: Argument;
      dispatch: React.Dispatch<Action>;
      [propName: string]: unknown;
    },
    ref: any
  ) => {
    const [focus, setFocus] = React.useState<false | number>(false);
    React.useEffect(() => {
      if (argument.text === "") {
        setFocus(Date.now());
      }
    }, []);
    return (
      <div
        key={argument.id}
        className="list-item-container"
        {...rest}
        ref={ref}
      >
        <div className="argument-description-container">
          <div className="description">
            <TextArea
              isFocused={focus}
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
              value={argument.text}
            />
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
