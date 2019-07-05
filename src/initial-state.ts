import { State } from "./types";
import { uid } from "./utils";
export const getInitialState = () => {
  return INITIAL_STATE;
};
export const INITIAL_STATE: State = {
  pros: [
    {
      text: "It's fun",
      type: "pro",
      id: "1",
      weight: 1
    },
    {
      text: "It breaks the problem down to 2 dimensions",
      type: "pro",
      id: "2",
      weight: 1
    }
  ],
  cons: [
    {
      text: "I could be outside",
      type: "con",
      id: "3",
      weight: 1
    }
  ],
  title: "Should I use a pros and cons list to make a decision ?",
  winner: "",
  isLive: false,
  hasIdInUrl: false,
  idInUrl: "",
  isAuthed: false
};

// export const INITIAL_STATE: State = {
//   pros: [
//     {
//       text: "It's fun",
//       type: "pro",
//       id: uid(),
//       weight: 1
//     },
//     {
//       text: "It breaks the problem down to 2 dimensions",
//       type: "pro",
//       id: uid(),
//       weight: 2
//     }
//     // ...range(1, 10).map(i => ({
//     //   text: `a ${i}`,
//     //   type: "pro" as "pro",
//     //   id: uid(),
//     //   weight: 1
//     // }))
//   ],
//   cons: [
//     {
//       text: "I could be doing something else",
//       type: "con",
//       id: uid(),
//       weight: 1
//     }
//   ],
//   title: "Should I use a pros and cons list to make a decision ?",
//   winner: ""
// };
