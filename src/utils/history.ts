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
  const hasIdInUrl = history.location.pathname !== "/";
  const idInUrl = history.location.pathname.substr(
    1,
    history.location.pathname.length
  );
  dispatch({
    type: "update-url",
    payload: {
      hasIdInUrl,
      idInUrl
    }
  });
  const unlisten = history.listen((location, action) => {
    const hasIdInUrl = location.pathname !== "/";
    const idInUrl = location.pathname.substr(1, location.pathname.length);

    dispatch({
      type: "update-url",
      payload: {
        hasIdInUrl,
        idInUrl
      }
    });
  });
  return unlisten;
};
