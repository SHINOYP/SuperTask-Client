import React, { useEffect, useState } from "react";
import { Layout } from "../../Components/Layout/Layout";
import { MdOutlineCreateNewFolder } from "react-icons/md";
import { message  } from "antd";
import TaskTile from "../../Components/TaskTile/TaskTile";
import CreateTaskForm from "../../Components/CreateTaskForm/CreateTaskForm";
import FadeLoader from "react-spinners/FadeLoader";
import "./DashboardStyle.scss";


const Dashboard = () => {
  const [open, setOpen] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [changeTriggered, setChangeTriggered] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [loading,setLoading]=useState(false)
  
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


  const showModal = () => {
    setOpen(true);
  };

  const fetchAllTasks = async () => {
    
    try {
      const response = await fetch(`https://${process.env.REACT_APP_HOST_URI}/api/Task/get-tasks`);
      const json = await response.json();
      if (response.ok) {
        setTasks(json);
        setLoading(true)
      }else{
        errorMessage('something went wrong, Try again later')
       
      }
    } catch (error) {
     errorMessage('something went wrong, Try again later')
      console.log(error);
    }
  };

  const handleTaskdelete=async(values)=>{
    try {
      const response = await fetch(`https://${process.env.REACT_APP_HOST_URI}/api/Task/${values}`,{
        method:"DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const json = await response.json();
      if (response.ok) {
        success('Task deleted Succesfully')
        setChangeTriggered(!changeTriggered)
      }else{
        errorMessage('something went wrong, Try again later')
      }
    } catch (error) {
      errorMessage('something went wrong, Try again later')
      console.log(error);
    }
  }

  useEffect(() => {
    fetchAllTasks();
  }, [open,changeTriggered]);
  
  const refetchTasks = () => {
    fetchAllTasks();
  };
  return (
    <>
      {loading ? (
        <Layout>
          <div className="dasboard-main">
            {contextHolder}
            {/* <CreateTaskForm open={open} setOpen={setOpen} />
            <div className="dasboard-head">
              <h1>Tasks</h1>{" "}
              <div className="dasboard-create">
                <h4>create Task</h4>{" "}
                <MdOutlineCreateNewFolder onClick={showModal} size={30} />
              </div>
            </div> */}
            <div className="dashboard-tiles">
              {tasks?.map((item, index) => (
                <TaskTile
                  heading={item?.title}
                  description={item?.description}
                  date={item?.createdAt}
                  currentStatus={item?.status}
                  key={index}
                  id={item?._id || ""}
                  handleDelete={handleTaskdelete}
                  refetchTask={refetchTasks}
                />
              ))}
            </div>
          </div>
        </Layout>
      ) : (
       <div className="loader">
         <FadeLoader color="#000000" />
       </div>
      )}
    </>
  );
      }  
export default Dashboard;