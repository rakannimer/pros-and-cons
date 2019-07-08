import {
  firebaseDebouncedUpdate,
  firebaseDebouncedSet,
  firebaseSet
} from "../utils/firebase";
import { State, Action, Reducer } from "../types";
import { state, getSerializedState } from "../state";

export const withFirebaseUpdate = (reducer: Reducer) => {
  const newReducer = (s: State, action: Action) => {
    const newState = reducer(s, action);
    if (!state.isAuthed.get()) return newState;
    switch (action.type) {
      case "set-title": {
        firebaseDebouncedSet(
          `sessions/${state.idInUrl.get()}/title`,
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
          `sessions/${state.idInUrl.get()}/${listType}/${index}`,
          payload.argument
        );
        break;
      }
      case "delete-argument": {
        const { payload } = action;
        const { type } = payload.argument;
        const listType = type === "pro" ? "pros" : "cons";
        const serializedState = getSerializedState();
        firebaseSet(
          `sessions/${state.idInUrl.get()}/${listType}/`,
          serializedState[listType]
        );
        break;
      }
      case "add-argument": {
        const { payload } = action;
        const { argument } = payload;
        const listType = argument.type === "pro" ? "pros" : "cons";
        firebaseSet(
          `sessions/${state.idInUrl.get()}/${listType}/${newState[listType]
            .length - 1}`,
          argument
        );
        break;
      }
      case "clear-list": {
        const idInUrl = state.idInUrl.get();
        firebaseSet(`sessions/${idInUrl}/title`, null);
        firebaseSet(`sessions/${idInUrl}/pros`, null);
        firebaseSet(`sessions/${idInUrl}/cons`, null);
        break;
      }
      case "reorder-list": {
        const idInUrl = state.idInUrl.get();
        const { payload } = action;
        const { listType } = payload;
        const serializedState = getSerializedState();
        firebaseSet(
          `sessions/${idInUrl}/${listType}`,
          serializedState[listType]
        );
        break;
      }
      case "move-to-list": {
        const idInUrl = state.idInUrl.get();
        const serializedState = getSerializedState();
        firebaseSet(`sessions/${idInUrl}/pros`, serializedState.pros);
        firebaseSet(`sessions/${idInUrl}/cons`, serializedState.cons);
        break;
      }
    }
    return newState;
  };
  return newReducer;
};
