import * as db from "idb-keyval";

import { State, Action, Reducer } from "../types";
import { state, getSerializedState } from "../state";

export const withLocalStorageUpdate = (reducer: Reducer) => {
  const newReducer = (s: State, action: Action) => {
    const newState = reducer(s, action);
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
        state.idInUrl.get() === "" ? "offline-list" : state.idInUrl.get();
      db.set(storageId, getSerializedState());
    }

    return newState;
  };
  return newReducer;
};
