import { State, Action, Reducer } from "../types";

export const withLogger = (reducer: Reducer) => (
  state: State,
  action: Action
) => {
  if (process.env.NODE_ENV === "development") {
    console.log(
      `Action Type : ${action.type}`,
      "Action payload : ",
      "payload" in action ? action.payload : ""
    );
    // console.log(`Action Payload : `, "payload" in action ? action.payload : "");
    console.log("");
  }
  return reducer(state, action);
};
