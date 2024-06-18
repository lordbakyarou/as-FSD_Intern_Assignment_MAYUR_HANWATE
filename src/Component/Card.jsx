import { motion } from "framer-motion";

import { MdEdit } from "react-icons/md";
import { FaRegPlayCircle } from "react-icons/fa";
import { FaRegPauseCircle } from "react-icons/fa";
import { FaRegStopCircle } from "react-icons/fa";
import { CgDetailsMore } from "react-icons/cg";
import { useEffect, useState } from "react";
import AddTask from "./AddTask";
import EditTask from "./EditTask";

const Card = ({
  title,
  id,
  description,
  column,
  priority,
  handleDragStart,
}) => {
  const [duration, setDuration] = useState(0);
  const [timer, setTimer] = useState(null);
  const [showActions, setShowActions] = useState(true);

  const [openTask, setOpenTask] = useState(false);

  useEffect(() => {
    let interval = null;
    if (timer) {
      interval = setInterval(() => {
        setDuration((prevDuration) => prevDuration + 1);
      }, 1000);
    } else if (!timer && duration !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timer, duration]);

  const handlePlay = () => {
    if (!timer) {
      setTimer(true);
    }
  };

  const handlePause = () => {
    if (timer) {
      setTimer(false);
    }
  };

  const handleStop = () => {
    setTimer(false);
    setShowActions(false);
  };
  const formatDuration = (seconds) => {
    const hrs = String(Math.floor(seconds / 3600)).padStart(2, "0");
    const mins = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
    const secs = String(seconds % 60).padStart(2, "0");
    return `${hrs}:${mins}:${secs}`;
  };

  return (
    <>
      <Indicator before={id} column={column} />
      <motion.div
        class="block rounded-lg bg-white shadow-secondary-1 dark:bg-surface-dark dark:text-white text-surface"
        draggable
        layout
        layoutId={id}
        onDragStart={(e) => handleDragStart(e, { title, id, column })}
      >
        <div class="border-b-2 border-neutral-100 px-2  py-3 dark:border-white/10 flex items-center justify-between">
          <h5 class="mb-2 text-xl font-medium leading-tight w-56">{title}</h5>
          <MdEdit
            className="hover:text-gray-500"
            onClick={() => setOpenTask(true)}
          />
        </div>

        <div class="p-6 flex flex-col gap-2">
          <p class="mb-4 text-base">{description}</p>
          <div className="text-xs font-semibold flex justify-between">
            <div className="">
              {" "}
              <span className="text-green-400">Duration: </span>
              <span className=" text-blue-400">{formatDuration(duration)}</span>
            </div>
            <div
              className={`${priority === "Low" ? "text-gray-500" : ""} ${
                priority === "Medium" ? "text-yellow-500" : ""
              } ${priority === "High" ? "text-red-500" : ""}`}
            >
              {priority}
            </div>
          </div>
          <div className="flex justify-between">
            <div className="border rounded-full text-xs w-fit px-2 bg-gray-100 flex items-center justify-center font-semibold text-gray-500">
              24 Aug 2022
            </div>
            <div className="flex gap-1 items-center">
              {showActions ? (
                <>
                  <FaRegPlayCircle
                    className="text-gray-500 hover:text-gray-900 cursor-pointer"
                    onClick={handlePlay}
                  />
                  <FaRegPauseCircle
                    className="text-gray-500 hover:text-gray-900 cursor-pointer"
                    onClick={handlePause}
                  />
                  <FaRegStopCircle
                    className="text-gray-500 hover:text-gray-900 cursor-pointer"
                    onClick={handleStop}
                  />
                </>
              ) : (
                <CgDetailsMore className="text-gray-500 hover:text-gray-900 cursor-pointer" />
              )}
            </div>
          </div>
        </div>
        <div>
          {" "}
          {openTask && (
            <div
              onClick={(e) => {
                e.stopPropagation();
                // dispatch(openTask());
                setOpenTask(!openTask);
              }}
              className="fixed z-10 flex backdrop-blur-sm items-center justify-center left-0 top-0 w-full h-full"
            >
              <div
                onClick={(e) => e.stopPropagation()}
                className="bg-white p-10 rounded-xl shadow-md"
              >
                <EditTask
                  status={column}
                  id={id}
                  openTask={openTask}
                  title={title}
                  description={description}
                  priority={priority}
                  setOpenTask={setOpenTask}
                />
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </>
  );
};

export const Indicator = ({ before, column }) => {
  return (
    <div
      data-before={before || "-1"}
      data-column={column}
      className="my-0.6 h-0.5 w-full bg-violet-400 opacity-0"
    ></div>
  );
};
export default Card;
