import * as React from "react";
import * as db from "idb-keyval";

import { State, Action, Dispatcher } from "../types";

export const withLocalStorage = (reducer: React.Reducer<State, Action>) => {
  const newReducer = (state: State, action: Action) => {
    const newState = reducer(state, action);
    if (
      ["edit-argument", "add-argument", "delete-argument", "set-title"].indexOf(
        action.type
      ) !== -1
    ) {
      const storageId =
        newState.idInUrl === "" ? "offline-list" : newState.idInUrl;
      db.set(storageId, newState);
    }

    return newState;
  };
  return newReducer;
};
