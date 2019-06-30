export const range = (start: number, end: number) => {
  const result = [];
  for (let i = start; i <= end; i += 1) {
    result.push(i);
  }
  return result;
};

export const without = (arr: unknown[], index: number) => {
  return [...arr.slice(0, index), ...arr.slice(index + 1, arr.length)];
};

let __id = 0;
export const uid = () => `${__id++}`;
