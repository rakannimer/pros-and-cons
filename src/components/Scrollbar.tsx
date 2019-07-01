import * as React from "react";
//@ts-ignore
import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.css";

const Scrollbar: React.ComponentType<any> = props => {
  return <SimpleBar {...props} />;
};

export default Scrollbar;
