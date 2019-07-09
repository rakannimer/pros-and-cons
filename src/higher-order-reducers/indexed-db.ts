import * as db from "idb-keyval";

import { State, Action, Reducer } from "../types";

export const withLocalStorageUpdate = (reducer: Reducer) => {
  const newReducer = (state: State, action: Action) => {
    const newState = reducer(state, action);
    const actionsOfInterest: Action["type"][] = [
      "edit-argument",
      "add-argument",
      "delete-argument",
      "set-title",
      "reorder-list",
      "move-to-list"
    ];
    if (actionsOfInterest.indexOf(action.type) !== -1) {
      const storageId =
        newState.idInUrl === "" ? "offline-list" : newState.idInUrl;
      db.set(storageId, {
        pros: newState.pros,
        cons: newState.cons,
        title: newState.title
      });
    }

    return newState;
  };
  return newReducer;
};
