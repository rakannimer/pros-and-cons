import { State, ArgumentType } from "./types";
import { uid, range } from "./utils";

export const INITIAL_STATE: State = {
  pros: {},
  pros_keys_order: [],
  cons: {},
  cons_keys_order: [],
  title: "Should I use a pros and cons list to make a decision ?",
  winner: "",
  isLive: false,
  hasIdInUrl: false,
  idInUrl: ""
};
let id = uid();
INITIAL_STATE.pros[id] = {
  text: "It's fun",
  type: "pro",
  id,
  weight: 1
};
INITIAL_STATE.pros_keys_order.push(id);
id = uid();
INITIAL_STATE.pros[id] = {
  text: "It breaks the problem down to 2 dimensions",
  type: "pro",
  id,
  weight: 1
};
INITIAL_STATE.pros_keys_order.push(id);
id = uid();

INITIAL_STATE.cons[id] = {
  text: "I could be outside",
  type: "con",
  id,
  weight: 1
};
INITIAL_STATE.cons_keys_order.push(id);

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
