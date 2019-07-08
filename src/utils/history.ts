import memoize from "memoize-one";
import { createBrowserHistory } from "history";

export const getHistory = memoize(
  () => {
    return createBrowserHistory();
  },
  () => true
);
