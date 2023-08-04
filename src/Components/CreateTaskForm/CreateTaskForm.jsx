import React, { useState, useRef } from "react";
import "./CTFormStyle.sass";
import { Button, Modal, Form, Input, message, Space } from "antd";
import { useFormUpdate } from "../../Context/formContext";
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

/* eslint-disable no-template-curly-in-string */
const validateMessages = {
  required: "${label} is required!",
  types: {
    email: "${label} is not a valid email!",
    number: "${label} is not a valid number!",
  },
  number: {
    range: "${label} must be between ${min} and ${max}",
  },
};

const CreateTaskForm = ({ open, setOpen }) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const { form, setForm } = useFormUpdate();

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

  const formRef = useRef(null);

  const onFinish = async (values) => {
    try {
      const response = await fetch(
        `https://${process.env.REACT_APP_HOST_URI}/api/Task/create-task`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        }
      );
      const json = await response.json();
      if (response.ok) {
        success("New Task Added");
        setForm(!form);
        setOpen(false);
        setConfirmLoading(false);
        formRef.current?.resetFields();
      } else {
        errorMessage("something went wrong, Try again later");
      }
    } catch (error) {
      errorMessage("something went wrong, Try again later");
      console.log(error);
    }
  };

  const handleCancel = () => {
    // console.log("Clicked cancel button");
    setOpen(false);
  };

  return (
    <>
      {contextHolder}
      <Modal
        title="Create Task"
        open={open}
        okButtonProps={{ style: { display: "none" } }}
        confirmLoading={confirmLoading}
        footer={null}
        onCancel={handleCancel}
      >
        <Form
          {...layout}
          name="nest-messages"
          onFinish={onFinish}
          style={{ maxWidth: 600 }}
          validateMessages={validateMessages}
          ref={formRef}
        >
          <Form.Item
            name={["title"]}
            label="Title"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            rules={[{ required: true }]}
            name={["description"]}
            label="Description"
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
            <Button type="primary" htmlType="submit" loading={confirmLoading}>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default CreateTaskForm;
