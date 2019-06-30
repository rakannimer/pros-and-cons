import { State } from "./types";
import { uid } from "./utils";

export const INITIAL_STATE: State = {
  arguments: {},
  title: "",
  winner: "pro"
};
let id = uid();
INITIAL_STATE.arguments[id] = {
  text: "Reason for",
  type: "pro",
  id,
  weight: 1
};

id = uid();
INITIAL_STATE.arguments[id] = {
  text: "Reason against",
  type: "con",
  id,
  weight: 1
};

id = uid();
INITIAL_STATE.arguments[id] = {
  text: "Another reason for",
  type: "pro",
  id,
  weight: 2
};
