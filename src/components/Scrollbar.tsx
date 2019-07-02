import * as React from "react";
import Simplebar from "simplebar";
// Simplebar.removeObserver();
//@ts-ignore
import SimpleBarReact from "simplebar-react";
import "simplebar/dist/simplebar.css";

const Scrollbar: React.ComponentType<any> = props => {
  return <SimpleBarReact {...props} />;
};

export default Scrollbar;
