import React from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import Logo from "../../../Assets/Icons/logo.svg";
import { HiOutlineHome } from "react-icons/hi";
import { BsGraphUp } from "react-icons/bs";
import { BsFiles } from "react-icons/bs";
import { FiGrid } from "react-icons/fi";
import { CgMenuRound, CgClose } from "react-icons/cg";
import "../LayoutStyle.sass";

const Sidebars = () => {
  const [toggled, setToggled] = React.useState(false);
  const [broken, setBroken] = React.useState(
    window.matchMedia("(max-width: 1100px)").matches
  );
  
  
  return (
    <div style={{ display: "flex", height: "100%", minHeight: "400px" }}>
      <Sidebar
        toggled={toggled}
        customBreakPoint="1100px"
        onBreakPoint={setBroken}
        backgroundColor="#EDEDED"
      >
        <Menu
          menuItemStyles={{
            button: {
              [`&.active`]: {
                backgroundColor: " #EDEDED",
                color: "#b6c8d9",
              },
            },
          }}
        >
          <div className="Sidebar-icon" onClick={() => setToggled(!toggled)}>
            {" "}
            <img src={Logo} alt="SuperTask" style={{ marginTop: "10px" }} />
            <h1>Super Task</h1>
          </div>

          <MenuItem icon={<HiOutlineHome />} style={{ marginTop: "50%" }}>
            {" "}
            Home
          </MenuItem>
          <MenuItem icon={<BsGraphUp />}> Dashboard</MenuItem>
          <MenuItem icon={<BsFiles />}> Boards</MenuItem>
          <MenuItem icon={<FiGrid />}>More Options</MenuItem>
        </Menu>
      </Sidebar>
      <main style={{ padding: 10 }}>
        <div>
          {broken &&
            (!toggled ? (
              <CgMenuRound
                className="hamburger"
                onClick={() => setToggled(!toggled)}
                size={60}
              />
            ) : (
              <CgClose
                className="hamburger-active"
                onClick={() => setToggled(!toggled)}
                size={40}
              />
            ))}
        </div>
      </main>
    </div>
  );
};

export default Sidebars;
