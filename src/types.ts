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
  winner: ArgumentType;
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
    };
