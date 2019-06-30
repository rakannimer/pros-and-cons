import produce from "immer";

import { State, Action } from "./types";
import { findIndex, without } from "./utils";

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
        // s[affectedListId] = without(s[affectedListId], index);
        s[affectedListId].splice(index, 1);
      });
      console.log("delete-argument");
      return nextState;
      // return nextState;
    }
    case "set-winner-id": {
      const { winnerId } = action.payload;
      const nextState = produce(state, s => {
        s.winner = winnerId;
      });
      return nextState;
    }
    case "set-title": {
      const { title } = action.payload;
      const nextState = produce(state, s => {
        s.title = title;
      });
      return nextState;
    }
    default: {
      throw new Error(`Unspported action : ${JSON.stringify(action)}`);
    }
  }
}
