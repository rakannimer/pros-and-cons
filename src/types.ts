import { IObservableArray, IObservableValue } from "mobx";

export type ID = string;

export type ArgumentType = "pro" | "con";

export type Argument = {
  text: string;
  weight: number;
  id: ID;
  type: ArgumentType;
};

export type State = {
  pros: Argument[];
  cons: Argument[];
  title: string;
  winner: "pros" | "cons" | "";
  isAuthed: boolean;
  idInUrl: string;
  firebase: null | typeof import("firebase");
};

export type ObservableArgument = {
  text: IObservableValue<string>;
  weight: IObservableValue<number>;
  id: IObservableValue<ID>;
  type: IObservableValue<ArgumentType>;
};
export type ObservableState = {
  pros: IObservableArray<ObservableArgument>;
  cons: IObservableArray<ObservableArgument>;
  title: IObservableValue<string>;
  winner: IObservableValue<"pros" | "cons" | "">;
  isAuthed: IObservableValue<boolean>;
  idInUrl: IObservableValue<string>;
  firebase: typeof import("firebase") | null;
};

export type Dispatcher = React.Dispatch<Action>;
export type Reducer = React.Reducer<State, Action>;
export type Action =
  | {
      type: "add-argument";
      payload: {
        argument: Argument;
      };
    }
  | {
      type: "delete-argument";
      payload: {
        argument: Pick<Argument, "id" | "type">;
      };
    }
  | {
      type: "edit-argument";
      payload: { argument: Argument };
    }
  | {
      type: "set-winner-id";
      payload: {
        winnerId: "pros" | "cons" | "";
      };
    }
  | {
      type: "reorder-list";
      payload: {
        listType: "pros" | "cons";
        startIndex: number;
        endIndex: number;
      };
    }
  | {
      type: "move-to-list";
      payload: {
        startListType: "pros" | "cons";
        endListType: "pros" | "cons";
        startIndex: number;
        endIndex: number;
      };
    }
  | { type: "set-title"; payload: { title: string } }
  | { type: "clear-list" }
  | { type: "hydrate"; payload: State }
  | {
      type: "update-url";
      payload: {
        idInUrl: string;
      };
    }
  | { type: "set-is-authed"; payload: boolean }
  | {
      type: "set-pros";
      payload: State["pros"];
    }
  | {
      type: "set-cons";
      payload: State["cons"];
    }
  | {
      type: "set-firebase";
      payload: typeof import("firebase");
    };

export type Effect<S = ObservableState, AdditionalArgs = undefined> = {
  effect: (
    dispatch: Dispatcher,
    state: S,
    additionalArgs?: AdditionalArgs
  ) => React.EffectCallback;
  dependencies: (
    state: S,
    additionalArgs?: AdditionalArgs
  ) => unknown[] | undefined;
};
