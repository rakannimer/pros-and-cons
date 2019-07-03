import * as React from "react";
// import Simplebar from "simplebar";
// Simplebar.removeObserver();
// //@ts-ignore
// import SimpleBarReact from "simplebar-react";
// import "simplebar/dist/simplebar.css";

// import "react-perfect-scrollbar/dist/css/styles.css";
// import PerfectScrollbar from "react-perfect-scrollbar";

import CustomScrollbar from "react-scrollbars-custom";

// const Scrollbar: React.ComponentType<any> = props => {
//   return <div {...props} style={{ position: "relative", ...props.style }} />;
// };

const Scrollbar: React.ComponentType<any> = props => {
  return (
    <CustomScrollbar
      {...props}
      style={{ position: "relative", ...props.style }}
    />
  );
};

export default Scrollbar;
