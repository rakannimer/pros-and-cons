import produce from "immer";
import { State, Action } from "./types";

export function reducer(state: State, action: Action) {
  switch (action.type) {
    case "add-argument": {
      const { argument } = action.payload;
      const nextState = produce(state, s => {
        s.arguments[argument.id] = argument;
      });
      return nextState;
    }
    case "edit-argument": {
      const { argument } = action.payload;
      const { id } = argument;
      const nextState = produce(state, s => {
        s.arguments[id] = { ...argument };
      });
      return nextState;
    }
    case "delete-argument": {
      const { argument } = action.payload;
      const { id } = argument;
      const nextState = produce(state, s => {
        delete s.arguments[id];
      });
      return nextState;
    }
    default: {
      throw new Error(`Unspported action : ${JSON.stringify(action)}`);
    }
  }
}
