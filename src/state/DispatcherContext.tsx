import * as React from "react";
import { Dispatcher } from "../types";

export const DispatcherContext = React.createContext<Dispatcher>(() => {});
