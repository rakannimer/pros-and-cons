import * as React from "react";
import { Animated } from "react-animated-css";

import { TextArea } from "./TextArea";
import { range } from "../utils";
import { Argument } from "../types";
import { DispatcherContext } from "../state/DispatcherContext";

type Props = {
  argument: Argument;
  style?: React.CSSProperties;
  [propName: string]: unknown;
};

export const ListItem = React.memo<Props>(
  React.forwardRef(
    ({ argument, ...rest }: Props, ref: React.Ref<HTMLDivElement>) => {
      const dispatch = React.useContext(DispatcherContext);
      const [focus, setFocus] = React.useState<false | number>(false);
      React.useEffect(() => {
        if (argument.text === "") {
          setFocus(Date.now());
        }
      }, []);

      const [shouldAnimateOut, setShouldAnimateOut] = React.useState(false);
      return (
        <Animated
          key={argument.id}
          animationIn="fadeIn"
          animationInDuration={0}
          animationOut="fadeOut"
          isVisible={!shouldAnimateOut}
          animateOnMount={false}
        >
          <div
            key={argument.id}
            className={`list-item-container ${
              argument.text === "" ? "animated fadeIn fast" : ""
            } ${shouldAnimateOut ? "shrink-height" : ""}`}
            {...rest}
            style={{
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
                  value={`${argument.weight}`}
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
              <div className="hint">Importance</div>
            </div>
            <div className="argument-delete-container">
              <button
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
          </div>
        </Animated>
      );
    }
  ),
  (prevProps, props) => {
    return (
      props.argument.id !== prevProps.argument.id &&
      props.argument.text === prevProps.argument.text &&
      props.argument.weight === prevProps.argument.weight
    );
  }
);
