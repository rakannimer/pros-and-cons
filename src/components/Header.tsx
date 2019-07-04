import * as React from "react";

import { TextArea } from "./TextArea";
import { Action } from "../types";

export const Header = React.memo(
  ({
    title,
    dispatch,
    downloadAsJson
  }: {
    title: string;
    downloadAsJson: Function;
    dispatch: React.Dispatch<Action>;
  }) => {
    const [focus, setFocus] = React.useState<false | number>(false);
    React.useEffect(() => {
      setFocus(Date.now());
    }, []);
    return (
      <>
        <div className="app-header">PROS & CONS</div>
        <div className="title-and-share-container">
          <div className="title-container">
            <TextArea
              isFocused={focus}
              isSelected={false}
              onChange={title => {
                dispatch({ type: "set-title", payload: { title } });
              }}
              value={title}
              style={{ width: "50%" }}
            />
          </div>
          <div className="share-button-container">
            <button
              className="share-button"
              onClick={() => {
                downloadAsJson();
              }}
            >
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
