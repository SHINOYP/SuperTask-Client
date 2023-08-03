import React, { useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { Button, Popover, Checkbox, Select,message } from "antd";
import { CiMenuKebab } from "react-icons/ci";
import { AiOutlineDelete } from "react-icons/ai";
import "./TaskTile.sass";
const { Option } = Select;

const TaskTile = ({
  heading,
  description,
  date,
  id,
  status,
  handleDelete,
  setRefreshTrigger,
  refreshTrigger,
}) => {
  const [editable, setEditable] = useState(false);
  const [Heading, setHeading] = useState(heading);
  const [Description, setDescription] = useState(description);
  const [taskStatus, setTaskStatus] = useState(status);
  const [messageApi, contextHolder] = message.useMessage();

  const success = (message) => {
    messageApi.open({
      type: "success",
      content: message,
    });
  };

  const errorMessage = (message) => {
    messageApi.open({
      type: 'error',
      content: message,
    });
  };

  const onChange = (e) => {
    console.log(`checked = ${e.target.checked}`);
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
   
    try {
      const response = await fetch(`https://${process.env.REACT_APP_HOST_URI}/api/Task/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(objData),
      });
      const result = await response.json();
      if (response.ok) {
        success('Task Updated')
        setRefreshTrigger(!refreshTrigger);
      } else {
        errorMessage('something went wrong, Try again later')
      }
    } catch (error) {
      errorMessage('something went wrong, Try again later')
      console.log(error);
    }

    setEditable(false);
  };

  const arr = ["Pending", "Ongoing", "Finished"];

  return (
    <div className="tile-main">
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
        <Checkbox className="checkbox" onChange={onChange}></Checkbox>
        <div>
          {editable ? (
            <input type="text" value={Heading} onChange={handleHeadingChange} />
          ) : (
            <h1>{heading}</h1>
          )}
          {editable ? (
            <textarea value={Description} onChange={handleDescriptionChange} />
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
          showSearch
          className="form-select mb-3"
          onChange={(value) => {
            setTaskStatus(value);
            handleSaveButtonClick();
          }}
          value={status}
        >
          {arr?.map((item, index) => (
            <Option key={index} value={item}>
              {item}
            </Option>
          ))}
        </Select>
      </div>
    </div>
  );
};

export default TaskTile;
