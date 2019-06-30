import { State, ArgumentType } from "./types";
import { uid, range } from "./utils";

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
    },
    ...range(1, 10).map(() => ({
      id: uid(),
      type: "pro" as ArgumentType,
      weight: 1,
      text: "Text"
    }))
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
