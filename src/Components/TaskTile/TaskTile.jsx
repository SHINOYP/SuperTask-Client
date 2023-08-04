import React, { useEffect, useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { Button, Popover, Checkbox, Select, message, Badge } from "antd";
import { CiMenuKebab } from "react-icons/ci";
import { AiOutlineDelete } from "react-icons/ai";
import "./TaskTile.scss";
const { Option } = Select;

const TaskTile = ({
  heading,
  description,
  date,
  id,
  currentStatus,
  handleDelete,
  refetchTask,
}) => {
  const [editable, setEditable] = useState(false);
  const [Heading, setHeading] = useState(heading);
  const [Description, setDescription] = useState(description);
  const [taskStatus, setTaskStatus] = useState();
  const [messageApi, contextHolder] = message.useMessage();

  const success = (message) => {
    messageApi.open({
      type: "success",
      content: message,
    });
  };

  const errorMessage = (message) => {
    messageApi.open({
      type: "error",
      content: message,
    });
  };

  const createdAtLocal = new Date(date).toLocaleString();

  const text = <span>Edit</span>;

  const content = (
    <div className="tile-toggle-popup">
      <Button
        icon={<AiOutlineDelete />}
        onClick={() => handleDelete(id)}
        danger
      >
        Delete
      </Button>
    </div>
  );

  const handleHeadingChange = (event) => {
    setHeading(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleEditButtonClick = () => {
    setEditable(!editable);
  };

  const handleSaveButtonClick = async () => {
    const objData = {
      title: Heading,
      description: Description,
      status: taskStatus,
    };

    console.log(objData);
    try {
      const response = await fetch(
        `https://${process.env.REACT_APP_HOST_URI}/api/Task/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(objData),
        }
      );
      const result = await response.json();
      if (response.ok) {
        success("Task Updated");
        console.log(result);
        setEditable(false);
        refetchTask();
      } else {
        errorMessage("something went wrong, Try again later");
      }
    } catch (error) {
      errorMessage("something went wrong, Try again later");
      console.log(error);
    }
  };

  const handleStatusUpdate = async (data) => {
    const objData = {
      status: data,
    };

    try {
      const response = await fetch(
        `https://${process.env.REACT_APP_HOST_URI}/api/Task/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(objData),
        }
      );
      const result = await response.json();
      if (response.ok) {
        success("Task Updated");
        refetchTask();
      } else {
        errorMessage("something went wrong, Try again later");
      }
    } catch (error) {
      errorMessage("something went wrong, Try again later");
      console.log(error);
    }
  };

  const arr = ["Pending", "Ongoing", "Finished"];

  function BadgeColor() {
    switch (true) {
      case currentStatus === "Pending":
        return "red";
      case currentStatus === "Ongoing":
        return "cyan";
      case currentStatus === "Finished":
        return "green";
      default:
        return "red";
    }
  }

  return (
    <div className="tile-main">
      <Badge.Ribbon
        text={currentStatus}
        color={BadgeColor()}
        placement="start"
        style={{ left: "-25px", top: "-10px" }}
      >
        {contextHolder}

        <div className="tile-text">
          <Popover
            placement="rightTop"
            title={text}
            content={content}
            trigger="click"
          >
            <CiMenuKebab size={20} className="delete-icon" />
          </Popover>
          <div>
            {editable ? (
              <input
                type="text"
                value={Heading}
                onChange={handleHeadingChange}
              />
            ) : (
              <h1>{heading}</h1>
            )}
            {editable ? (
              <textarea
                value={Description}
                onChange={handleDescriptionChange}
              />
            ) : (
              <p>{description}</p>
            )}
          </div>
        </div>
        <div className="tile-toggle">
          <small>{createdAtLocal}</small>
          {editable ? (
            <button onClick={handleSaveButtonClick}>Save</button>
          ) : (
            <AiOutlineEdit onClick={handleEditButtonClick}>Edit</AiOutlineEdit>
          )}

          <Select
            bordered={false}
            placeholder="Select a category"
            size="large"
            className="form-select mb-3"
            onChange={(value) => handleStatusUpdate(value)}
            value={currentStatus}
          >
            {arr?.map((item, index) => (
              <Option key={index} value={item} disabled={editable}>
                {item}
              </Option>
            ))}
          </Select>
        </div>
      </Badge.Ribbon>
    </div>
  );
};

export default TaskTile;
