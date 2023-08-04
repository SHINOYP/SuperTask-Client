import React from "react";
import Sidebars from "./Sidbar/Sidebar";

export const Layout = ({ children }) => {
  return (
    <div className="layout">
      <Sidebars />
      <div className="content">{children}</div>
    </div>
  );
};
