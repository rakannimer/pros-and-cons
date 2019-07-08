declare module "simplebar-react" {
  import * as React from "react";
  const Simplebar: React.ComponentType<{ style?: React.CSSProperties }>;
  export = Simplebar;
}

// type SimplebarOptions = {
//   wrapContent?: boolean;
//   autoHide?: boolean;
//   scrollbarMinSize?: number;
//   classNames?: {
//     content?: string;
//     scrollContent?: string;
//     scrollbar?: string;
//     track?: string;
//   };
// };
