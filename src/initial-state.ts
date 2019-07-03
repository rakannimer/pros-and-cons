import { State, ArgumentType } from "./types";
import { uid, range } from "./utils";

export const INITIAL_STATE: State = {
  pros: [
    {
      text: "It's fun",
      type: "pro",
      id: uid(),
      weight: 1
    },
    {
      text: "It breaks it down to 2 dimensions only",
      type: "pro",
      id: uid(),
      weight: 2
    }
  ],
  cons: [
    {
      text: "I could be doing something else",
      type: "con",
      id: uid(),
      weight: 1
    }
  ],
  title: "Should I use a pros and cons list to make a decision ?",
  winner: ""
};
