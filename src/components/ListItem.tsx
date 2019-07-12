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
      const [height, setHeight] = React.useState<React.CSSProperties["height"]>(
        "12vh"
      );
      React.useEffect(() => {
        if (argument.text === "") {
          setFocus(Date.now());
        }
      }, []);
      React.useLayoutEffect(() => {
        if (textAreaRef === null || textAreaRef.current === null) return;
        textAreaRef.current.addEventListener("autosize:resized", () => {
          if (textAreaRef === null || textAreaRef.current === null) return;
          requestAnimationFrame(() => {
            if (textAreaRef === null || textAreaRef.current === null) return;
            setHeight(textAreaRef.current.clientHeight);
          });
        });
      }, []);
      const [shouldAnimateOut, setShouldAnimateOut] = React.useState(false);
      const textAreaRef = React.useRef<HTMLTextAreaElement | null>(null);
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
            aria-roledescription={undefined}
            style={{
              ...rest.style,
              height
            }}
            ref={ref}
          >
            <div className="argument-description-container">
              <div className="description">
                <TextArea
                  isFocused={focus}
                  ref={textAreaRef}
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
                    // if (textAreaRef.current === null) return;
                    // console.error(
                    //   "My height is "
                    //   // textAreaRef.current.
                    // );
                  }}
                  value={argument.text}
                />
              </div>
            </div>
            <div className="weight-and-hint">
              <div className="argument-weight-container">
                <select
                  aria-label="Set importance"
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
                aria-label={"Delete argument"}
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
