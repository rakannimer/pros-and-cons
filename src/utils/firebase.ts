import memoize from "memoize-one";

import { Dispatcher } from "../types";

export const initializeFirebase = async (
  sessionId: string,
  dispatch: Dispatcher
) => {
  if (sessionId === "") {
    return;
  }
  const firebase = await getFirebase();
  const isAuthed = firebase.auth().currentUser !== null;
  if (!isAuthed) {
    await firebase.auth().signInAnonymously();
  }
  dispatch({ type: "set-is-authed", payload: true });
};

export const getFirebase = memoize(
  async () => {
    console.log("getting firebase");
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
