import React, { useState } from "react";
import { MdOutlineCancel } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import {
  // openTask,
  createPendingTask,
  createInProgressTask,
  createCompletedTask,
  createDeferredTask,
  editTask,
} from "../redux/features/taskSlice/taskSlice";

import axios from "axios";

const URL = import.meta.env.VITE_API_URL;

const EditTask = ({
  status,
  title,
  description,
  priority,
  openTask,
  id,
  setOpenTask,
}) => {
  const dispatch = useDispatch();
  // console.log(status);

  const [task, setTask] = useState({
    title: title,
    description: description,
    priority: priority,
    status: status,
  });

  function taskInput(e) {
    setTask({ ...task, [e.target.name]: e.target.value });
  }

  async function createNewTask(e) {
    e.preventDefault();
    //   dispatch;

    let todo;

    try {
      todo = await axios.post(
        `${URL}/todo/editTodo`,
        {
          todoId: id,
          updatedTodo: {
            todoName: task.title,
            todoDescription: task.description,
            todoStatus: status,
            todoPriority: task.priority,
            todoCurrentAction: "Pause",
          },
        },
        { withCredentials: true }
      );
      console.log("Updated todo", todo);
    } catch (error) {
      console.log(error);
    }

    const cardToEdit = {
      title: todo.data.message.todoName,
      description: todo.data.message.todoDescription,
      assignee: task.assignee, //pass here  the user name
      priority: todo.data.message.todoPriority,
      id: todo.data.message._id,
      column: todo.data.message.todoStatus,
    };

    dispatch(editTask({ id, cardToEdit }));

    setOpenTask(false);
  }

  return (
    <form className="w-full relative max-w-md" onSubmit={createNewTask}>
      <div className="absolute -right-5 -top-5 cursor-pointer w-fit">
        <MdOutlineCancel onClick={() => setOpenTask(false)} />
      </div>
      <div className="flex flex-col -mx-3  mb-6 gap-2">
        <div className="w-96 px-3 mb-6 md:mb-0">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="grid-first-name"
          >
            Title
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            id="grid-first-name"
            type="text"
            value={task.title}
            name="title"
            onChange={taskInput}
          />
          {/* <p className="text-red-500 text-xs italic">
            Please fill out this field.
          </p> */}
        </div>
        <div className="w-full px-3">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="grid-last-name"
          >
            Description
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="grid-last-name"
            type="text"
            value={task.description}
            name="description"
            onChange={taskInput}
          />
        </div>
        <div className="w-full px-3 mb-6 md:mb-0">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="grid-first-name"
          >
            Assignee
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            id="grid-first-name"
            type="text"
            placeholder="User Name"
            name="assignee"
            onChange={taskInput}
            disabled={true}
          />
          {/* <p className="text-red-500 text-xs italic">
            Please fill out this field.
          </p> */}
        </div>
      </div>
      <div className="flex justify-between flex-wrap -mx-3 mb-2">
        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="grid-state"
          >
            Priority
          </label>
          <div className="relative">
            <select
              className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-state"
              name="priority"
              onChange={taskInput}
              value={task.priority}
            >
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg
                className="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="grid-state"
          >
            Status
          </label>
          <div className="relative">
            <select
              className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-state"
              name="status"
              onChange={taskInput}
              value={task.status}
            >
              <option value="pending">Pending</option>
              <option value="inProgress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="deferred">Deferred</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg
                className="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="flex mt-5 items-center w-full justify-center">
        <button
          type="submit"
          class="bg-blue-500 flex hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Edit Task
        </button>
      </div>
    </form>
  );
};

export default EditTask;
