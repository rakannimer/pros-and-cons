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
};

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
  | { type: "hydrate"; payload: State };
