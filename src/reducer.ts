import produce from "immer";

import { State, Action, ArgumentType } from "./types";
import { findIndex } from "./utils";

export function reducer(state: State, action: Action) {
  switch (action.type) {
    case "set-is-authed": {
      const nextState = produce(state, s => {
        s.isAuthed = action.payload;
      });
      return nextState;
    }
    case "update-url": {
      const nextState = produce(state, s => {
        s.hasIdInUrl = action.payload.hasIdInUrl;
        s.idInUrl = action.payload.idInUrl;
      });
      return nextState;
    }
    case "toggle-is-live": {
      const nextState = produce(state, s => {
        s.isLive = !s.isLive;
      });
      return nextState;
    }
    case "add-argument": {
      const { argument } = action.payload;
      const argId = argument.id;
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
      const argIndex = findIndex(state[affectedListId], v => v.id === id, {});
      const nextState = produce(state, s => {
        s[affectedListId][argIndex] = { ...argument };
      });
      return nextState;
    }
    case "delete-argument": {
      const { argument } = action.payload;
      const affectedListId = argument.type === "pro" ? "pros" : "cons";
      const { id } = argument;
      const keyIndex = findIndex(state[affectedListId], v => v.id === id, {
        action,
        state
      });
      const nextState = produce(state, s => {
        s[affectedListId].splice(keyIndex, 1);
      });
      return nextState;
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
    case "reorder-list": {
      const { listType, startIndex, endIndex } = action.payload;
      const keysOrderId =
        listType === "pros" ? `pros_keys_order` : "cons_keys_order";
      const nextState = produce(state, s => {
        const [removed] = s[listType].splice(startIndex, 1);
        s[listType].splice(endIndex, 0, removed);
      });
      return nextState;
    }
    case "clear-list": {
      const nextState = produce(state, s => {
        s.pros = [];
        s.cons = [];
        s.winner = "";
        s.title = "";
      });
      return nextState;
    }
    case "hydrate": {
      const nextState = produce(state, s => {
        s.pros = action.payload.pros;
        s.cons = action.payload.cons;
        s.title = action.payload.title;
      });
      console.log({ payload: action.payload, nextState });
      return nextState;
    }
    case "move-to-list": {
      const {
        startListType,
        endListType,
        startIndex,
        endIndex
      } = action.payload;
      const nextState = produce(state, s => {
        const [removed] = s[startListType].splice(startIndex, 1);
        const endListArgType = endListType.slice(
          endListType.length - 2,
          endListType.length - 1
        ) as ArgumentType;
        removed.type = endListArgType;
        s[endListType].splice(endIndex, 0, removed);
      });
      return nextState;
    }
    default: {
      throw new Error(`Unspported action : ${JSON.stringify(action)}`);
    }
  }
}
