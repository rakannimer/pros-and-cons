import * as React from "react";
import { Animated } from "react-animated-css";

import { TextArea } from "./TextArea";
import { range } from "../utils";
import { ObservableArgument } from "../types";
import { DispatcherContext } from "../state/DispatcherContext";

type Props = {
  argument: ObservableArgument;
  style?: React.CSSProperties;
  [propName: string]: unknown;
};

export const ListItem = React.memo<Props>(
  React.forwardRef(
    ({ argument, ...rest }: Props, ref: React.Ref<HTMLDivElement>) => {
      const dispatch = React.useContext(DispatcherContext);
      const [focus, setFocus] = React.useState<false | number>(false);
      React.useEffect(() => {
        if (argument.text.get() === "") {
          setFocus(Date.now());
        }
      }, []);

      const [shouldAnimateOut, setShouldAnimateOut] = React.useState(false);
      const argumentId = argument.id.get();
      return (
        <Animated
          key={argumentId}
          animationIn="fadeIn"
          animationInDuration={0}
          animationOut="fadeOut"
          isVisible={!shouldAnimateOut}
          animateOnMount={false}
        >
          <div
            key={argumentId}
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
                          ...{
                            text: argument.text.get(),
                            weight: argument.weight.get(),
                            id: argument.id.get(),
                            type: argument.type.get()
                          },
                          text: String(v)
                        }
                      }
                    });
                  }}
                  value={argument.text.get()}
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
                          text: argument.text.get(),
                          weight: Number(ev.target.value),
                          id: argument.id.get(),
                          type: argument.type.get()
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
                          id: argumentId,
                          type: argument.type.get()
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
      props.argumentId !== prevProps.argumentId &&
      props.argument.text === prevProps.argument.text &&
      props.argument.weight === prevProps.argument.weight
    );
  }
);
