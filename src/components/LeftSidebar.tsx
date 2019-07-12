import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";

export const LeftSidebar = React.memo(() => (
  <div className="left-sidebar">
    <div className="home-button">
      <FontAwesomeIcon icon={faHome} />
    </div>
  </div>
));
