import { State } from "./types";
import { uid } from "./utils";

export const INITIAL_STATE: State = {
  pros: [
    {
      text: "Reason for",
      type: "pro",
      id: uid(),
      weight: 1
    },
    {
      text: "Another reason for",
      type: "pro",
      id: uid(),
      weight: 2
    }
  ],
  cons: [
    {
      text: "Reason against",
      type: "con",
      id: uid(),
      weight: 1
    }
  ],
  title: "Decision",
  winner: ""
};
