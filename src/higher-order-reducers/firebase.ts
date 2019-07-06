import {
  firebaseDebouncedUpdate,
  firebaseDebouncedSet,
  firebaseSet
} from "../utils/firebase";
import { State, Action, Reducer } from "../types";

export const withFirebaseUpdate = (reducer: Reducer) => {
  const newReducer = (state: State, action: Action) => {
    const newState = reducer(state, action);
    if (!state.isAuthed) return newState;
    switch (action.type) {
      case "set-title": {
        firebaseDebouncedSet(
          `sessions/${state.idInUrl}/title`,
          action.payload.title
        );
        break;
      }
      case "edit-argument": {
        const { payload } = action;
        const { id, type } = payload.argument;
        const listType = type === "pro" ? "pros" : "cons";
        const index = newState[listType].findIndex(v => v.id === id);

        if (index === -1) return newState;
        firebaseDebouncedUpdate(
          `sessions/${state.idInUrl}/${listType}/${index}`,
          payload.argument
        );
        break;
      }
      case "delete-argument": {
        const { payload } = action;
        const { id, type } = payload.argument;
        const listType = type === "pro" ? "pros" : "cons";
        firebaseSet(
          `sessions/${state.idInUrl}/${listType}/`,
          newState[listType]
        );
        break;
      }
      case "add-argument": {
        const { payload } = action;
        const { argument } = payload;
        const listType = argument.type === "pro" ? "pros" : "cons";
        firebaseSet(
          `sessions/${state.idInUrl}/${listType}/${newState[listType].length -
            1}`,
          argument
        );
        break;
      }
      case "clear-list": {
        firebaseSet(`sessions/${newState.idInUrl}/title`, null);
        firebaseSet(`sessions/${newState.idInUrl}/pros`, null);
        firebaseSet(`sessions/${newState.idInUrl}/cons`, null);
        break;
      }
      case "reorder-list": {
        const { payload } = action;
        const { listType } = payload;
        firebaseSet(
          `sessions/${newState.idInUrl}/${listType}`,
          newState[listType]
        );
        break;
      }
      case "move-to-list": {
        firebaseSet(`sessions/${newState.idInUrl}/pros`, newState.pros);
        firebaseSet(`sessions/${newState.idInUrl}/cons`, newState.cons);
        break;
      }
    }
    return newState;
  };
  return newReducer;
};
