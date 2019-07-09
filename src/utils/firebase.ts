import { debounce } from "debounce";
import memoize from "memoize-one";

import { config } from "../config";

export const firebaseSet = (path: string, value: unknown) => {
  return getFirebase().then(firebase => {
    return firebase
      .database()
      .ref(path)
      .set(value);
  });
};
export const firebaseDebouncedSet = debounce(firebaseSet);

export const firebaseUpdate = (path: string, value: {}) => {
  return getFirebase().then(firebase => {
    return firebase
      .database()
      .ref(path)
      .update(value);
  });
};

export const firebaseDebouncedUpdate = debounce(firebaseUpdate);

export const getFirebase = memoize(
  async () => {
    const firebasePromise: [
      typeof import("firebase/app"),
      unknown,
      unknown
    ] = await Promise.all([
      import("firebase/app"),
      import("firebase/database"),
      import("firebase/auth")
    ]);
    const firebaseConfig = config.firebase;
    const [firebase] = firebasePromise;
    firebase.initializeApp(firebaseConfig);
    return firebase;
  },
  () => true
);
