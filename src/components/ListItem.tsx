import * as React from "react";
import { Animated } from "react-animated-css";

import { TextArea } from "./TextArea";
import { range } from "../utils";
import { Action, Argument } from "../types";

export const ListItem = React.memo(
  React.forwardRef(
    (
      {
        argument,
        dispatch,
        ...rest
      }: {
        argument: Argument;
        dispatch: React.Dispatch<Action>;
        style?: React.CSSProperties;
        [propName: string]: unknown;
      },
      ref: React.Ref<HTMLDivElement>
    ) => {
      const [focus, setFocus] = React.useState<false | number>(false);
      React.useEffect(() => {
        if (argument.text === "") {
          setFocus(Date.now());
        }
      }, []);

      const [shouldAnimateOut, setShouldAnimateOut] = React.useState(false);
      return (
        <Animated
          animationIn="fadeIn"
          animationOut="fadeOut"
          isVisible={!shouldAnimateOut}
        >
          <div
            key={argument.id}
            className={`list-item-container ${
              shouldAnimateOut ? "shrink-height" : ""
            }`}
            {...rest}
            style={{
              animationDuration: "1s",
              ...rest.style
            }}
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
                if (shouldAnimateOut === true) return;
                setShouldAnimateOut(true);
                setTimeout(() => {
                  dispatch({
                    type: "delete-argument",
                    payload: {
                      argument: {
                        id: argument.id,
                        type: argument.type
                      }
                    }
                  });
                }, 1000);
              }}
            >
              <div className="icon-cancel-circled-outline" />
            </button>
          </div>
        </Animated>
      );
    }
  )
);
