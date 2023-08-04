import React from "react";
import Sidebars from "./Sidebar";
import Header from "./Header";

export const Layout = ({ children }) => {
  const [toggled, setToggled] = React.useState(false);
  const [broken, setBroken] = React.useState(
    window.matchMedia("(max-width: 1100px)").matches
  );

  return (
    <div className="layout">
      <Sidebars
        broken={broken}
        setBroken={setBroken}
        toggled={toggled}
        setToggled={setToggled}
      />
      <div className="content">
        <Header
          broken={broken}
          setBroken={broken}
          setToggled={setToggled}
          toggled={toggled}
        />
        {children}
      </div>
    </div>
  );
};
