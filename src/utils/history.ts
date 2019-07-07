import memoize from "memoize-one";
import { createBrowserHistory } from "history";
import { Dispatcher } from "../types";

export const getHistory = memoize(
  () => {
    return createBrowserHistory();
  },
  () => true
);

export const mapHistoryToState = (dispatch: Dispatcher) => {
  const history = getHistory();
  const idInUrl = history.location.pathname.substr(
    1,
    history.location.pathname.length
  );
  dispatch({
    type: "update-url",
    payload: {
      idInUrl
    }
  });
  const unlisten = history.listen((location, action) => {
    const idInUrl = location.pathname.substr(1, location.pathname.length);
    dispatch({
      type: "update-url",
      payload: {
        idInUrl
      }
    });
  });
  return unlisten;
};
