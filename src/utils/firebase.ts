import memoize from "memoize-one";
import { debounce } from "debounce";

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
    const firebaseConfig = {
      apiKey: "AIzaSyDFlpM-x7xMq_0GHfgoBCeYKfXdtfTZYG0",
      authDomain: "pros-and-cons-c21f9.firebaseapp.com",
      databaseURL: "https://pros-and-cons-c21f9.firebaseio.com",
      projectId: "pros-and-cons-c21f9",
      storageBucket: "",
      messagingSenderId: "319805998868",
      appId: "1:319805998868:web:7767e7938b9224f9"
    };
    const [firebase] = firebasePromise;
    firebase.initializeApp(firebaseConfig);
    return firebase;
  },
  () => true
);
