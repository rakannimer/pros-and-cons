import produce from "immer";

import { State, Action } from "./types";
import { findIndex } from "./utils";

export function reducer(state: State, action: Action) {
  switch (action.type) {
    case "add-argument": {
      const { argument } = action.payload;
      const affectedListId = argument.type === "pro" ? "pros" : "cons";
      const nextState = produce(state, s => {
        s[affectedListId].push(argument);
      });
      return nextState;
    }
    case "edit-argument": {
      const { argument } = action.payload;
      const affectedListId = argument.type === "pro" ? "pros" : "cons";
      const { id } = argument;
      const index = findIndex(state[affectedListId], v => v.id === id, {
        action,
        state
      });
      const nextState = produce(state, s => {
        s[affectedListId][index] = { ...argument };
      });
      return nextState;
    }
    case "delete-argument": {
      const { argument } = action.payload;
      const affectedListId = argument.type === "pro" ? "pros" : "cons";
      const { id } = argument;
      const index = findIndex(state[affectedListId], v => v.id === id, {
        action,
        state
      });
      const nextState = produce(state, s => {
        s[affectedListId].splice(index, 1);
      });
      return nextState;
    }
    default: {
      throw new Error(`Unspported action : ${JSON.stringify(action)}`);
    }
  }
}
