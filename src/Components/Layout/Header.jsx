import React, { useState } from "react";
import { MdOutlineCreateNewFolder } from "react-icons/md";
import CreateTaskForm from "../CreateTaskForm/CreateTaskForm";
import { CgMenuRound, CgClose } from "react-icons/cg";

const Header = ({ broken, toggled, setToggled }) => {
  const [open, setOpen] = useState(false);
  const showModal = () => {
    setOpen(true);
  };
  return (
    <>
      <CreateTaskForm open={open} setOpen={setOpen} />
      <div className="dasboard-head">
        <div>
          {broken &&
            (!toggled ? (
              <CgMenuRound
                className="hamburger"
                onClick={() => setToggled(!toggled)}
                size={50}
              />
            ) : (
              <CgClose
                className="hamburger-active"
                onClick={() => setToggled(!toggled)}
                size={40}
              />
            ))}
        </div>
        <h1>Tasks</h1>{" "}
        <div className="dasboard-create">
          <h4>create Task</h4>{" "}
          <MdOutlineCreateNewFolder onClick={showModal} size={30} />
        </div>
      </div>
    </>
  );
};

export default Header;
