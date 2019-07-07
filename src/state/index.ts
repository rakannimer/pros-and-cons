import { observable } from "mobx";
import { getInitialState } from "./initial-state";

import { ObservableState, ObservableArgument, Argument, State } from "../types";

export const initialState = getInitialState();

const argumentToObservableArgument = (arg: Argument) => {
  const argument: ObservableArgument = {
    id: observable.box(arg.id),
    type: observable.box(arg.type),
    text: observable.box(arg.text),
    weight: observable.box(arg.weight)
  };
  return argument;
};

const observablePros = initialState.pros.map(pro => {
  return argumentToObservableArgument(pro);
});

const observableCons = initialState.cons.map(con => {
  return argumentToObservableArgument(con);
});

export const state: ObservableState = {
  pros: observable.array(observablePros),
  cons: observable.array(observableCons),
  winner: observable.box<State["winner"]>(""),
  idInUrl: observable.box(""),
  isAuthed: observable.box(false),
  title: observable.box("")
};

export const actions = {};
