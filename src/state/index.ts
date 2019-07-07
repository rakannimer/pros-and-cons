import { observable } from "mobx";

import { getInitialState } from "./initial-state";
import {
  ObservableState,
  ObservableArgument,
  Argument,
  State,
  Action,
  ArgumentType
} from "../types";
import { findIndex } from "../utils/index";
export const initialState = getInitialState();

const argumentToObservableArgument = (arg: Argument) => {
  const argument: ObservableArgument = {
    id: observable.box(arg.id),
    type: observable.box(arg.type),
    text: observable.box(arg.text),
    weight: observable.box(arg.weight)
  };
  return argument;
};

const observablePros = initialState.pros.map(pro => {
  return argumentToObservableArgument(pro);
});

const observableCons = initialState.cons.map(con => {
  return argumentToObservableArgument(con);
});

export const state: ObservableState = {
  pros: observable.array(observablePros),
  cons: observable.array(observableCons),
  winner: observable.box<State["winner"]>(""),
  idInUrl: observable.box(""),
  isAuthed: observable.box(false),
  title: observable.box("")
};
import produce from "immer";

export const reducer = (currentState: State, action: Action) => {
  switch (action.type) {
    case "set-pros": {
      state.pros.replace(action.payload.map(argumentToObservableArgument));
      return currentState;
    }
    case "set-cons": {
      state.cons.replace(action.payload.map(argumentToObservableArgument));
      return currentState;
    }
    case "set-is-authed": {
      state.isAuthed.set(action.payload);
      return currentState;
    }
    case "update-url": {
      state.idInUrl.set(action.payload.idInUrl);
      return currentState;
    }
    case "add-argument": {
      const { argument } = action.payload;
      const affectedListId = argument.type === "pro" ? "pros" : "cons";
      state[affectedListId].push(argumentToObservableArgument(argument));
      return currentState;
    }
    case "edit-argument": {
      const { argument } = action.payload;
      const affectedListId = argument.type === "pro" ? "pros" : "cons";
      const { id } = argument;
      const argIndex = findIndex(
        state[affectedListId],
        v => v.id.get() === id,
        {
          action,
          state
        }
      );
      state[affectedListId][argIndex].weight.set(argument.weight);
      state[affectedListId][argIndex].text.set(argument.text);
      state[affectedListId][argIndex].type.set(argument.type);
      state[affectedListId][argIndex].id.set(argument.id);
      return currentState;
    }
    case "delete-argument": {
      const { argument } = action.payload;
      const affectedListId = argument.type === "pro" ? "pros" : "cons";
      const { id } = argument;
      const keyIndex = findIndex(
        state[affectedListId],
        v => v.id.get() === id,
        {
          action,
          state
        }
      );
      state[affectedListId].splice(keyIndex, 1);
      return currentState;
    }
    case "set-winner-id": {
      const { winnerId } = action.payload;
      state.winner.set(winnerId);
      return currentState;
    }
    case "set-title": {
      const { title } = action.payload;
      state.title.set(title);
      return currentState;
    }
    case "reorder-list": {
      const { listType, startIndex, endIndex } = action.payload;
      const [removed] = state[listType].splice(startIndex, 1);
      state[listType].splice(endIndex, 0, removed);
      return currentState;
    }
    case "clear-list": {
      state.pros.clear();
      state.cons.clear();
      state.winner.set("");
      state.title.set("");
      return currentState;
    }
    case "hydrate": {
      state.pros.replace(action.payload.pros.map(argumentToObservableArgument));
      state.cons.replace(action.payload.cons.map(argumentToObservableArgument));
      state.title.set(action.payload.title);
      return currentState;
    }
    case "move-to-list": {
      const {
        startListType,
        endListType,
        startIndex,
        endIndex
      } = action.payload;

      const [removed] = state[startListType].splice(startIndex, 1);
      const endListArgType = endListType.slice(
        0,
        endListType.length - 1
      ) as ArgumentType;
      removed.type.set(endListArgType);
      state[endListType].splice(endIndex, 0, removed);

      return currentState;
    }
    default: {
      throw new Error(`Unspported action : ${JSON.stringify(action)}`);
    }
  }
};
