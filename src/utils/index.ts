export * from "./firebase";
export * from "./history";
export const range = (start: number, end: number) => {
  const result = [];
  for (let i = start; i <= end; i += 1) {
    result.push(i);
  }
  return result;
};

export const without = <T>(arr: T[], index: number) => {
  return [...arr.slice(0, index), ...arr.slice(index + 1, arr.length)];
};

export const findIndex = <T = unknown>(
  arr: T[],
  filter: (v: T) => boolean,
  logWhenThrowing: unknown
) => {
  const index = arr.findIndex(filter);
  if (index === -1) {
    throw new Error(
      `Could not find element in array: ${JSON.stringify(logWhenThrowing)}`
    );
  }
  return index;
};

import id from "nanoid";
export const uid = () => id();
