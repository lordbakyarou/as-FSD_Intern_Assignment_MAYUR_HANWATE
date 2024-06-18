import React, { useState } from "react";
import { FiPlusCircle } from "react-icons/fi";
import { MdOutlineCancel } from "react-icons/md";

import { motion } from "framer-motion";
import AddTask from "./AddTask";
import {
  // openTask,
  createPendingTask,
  createInProgressTask,
  createCompletedTask,
  createDeployedTask,
  createDeferredTask,
  removePendingTask,
  removeInProgressTask,
  removeCompletedTask,
  removeDeployedTask,
  removeDeferredTask,
} from "../redux/features/taskSlice/taskSlice";

import { useDispatch, useSelector } from "react-redux";
// import { openTask } from "../redux/features/taskSlice/taskSlice";

import Card from "./Card";
import { Indicator } from "./Card";
import axios from "axios";

const URL = import.meta.env.VITE_API_URL;

const Status = ({
  title,
  column,
  cards,
  borderColor,
  headingColor,
  backgroundColor,
}) => {
  const [active, setActive] = useState(false);

  const filterdColumns = cards.filter((item) => item.column == column);
  console.log(filterdColumns, "This is filtered collums");

  const [openTask, setOpenTask] = useState(false);

  const [text, setText] = useState("");
  const dispatch = useDispatch();
  const currentColumnData = useSelector((state) => state.task);
  console.log(currentColumnData, "current state");
  const openCreateTask = useSelector((state) => state.openCreateTask);

  const handleDragStart = (e, card) => {
    e.dataTransfer.setData("cardId", card.id);
    e.dataTransfer.setData("column", column);

    console.log(card.id);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    highlightIndicator(e);
    setActive(true);
  };

  const handleDragLeave = () => {
    clearHighlights();
    setActive(false);
  };

  const handleDragEnd = (e) => {
    setActive(false);
    clearHighlights();
    const indicators = getIndicators();
    const { element } = getNearestIndicator(e, indicators);

    const cardId = e.dataTransfer.getData("cardId");
    const before = element.dataset.before || "-1";
    const previousColumn = e.dataTransfer.getData("column");
    // console.log(indicators, element, cardId, "indicators", before, column);

    if (before !== cardId) {
      let copy = [...cards]; //copying data from dropping column

      // const stateData = useSelector((state) => state[column]);

      let cardToTransfer = currentColumnData[previousColumn].find(
        (c) => c.id === cardId
      );
      // console.log(cardToTransfer, copy, "inside data");

      if (!cardToTransfer) return;
      cardToTransfer = { ...cardToTransfer, column };
      // console.log(column);

      copy = copy.filter((c) => c.id !== cardId);

      const moveToBack = before === "-1";
      console.log(moveToBack, before);
      let insertAtIndex = copy.length;

      if (moveToBack) {
        copy.push(cardToTransfer);
      } else {
        insertAtIndex = copy.findIndex((el) => el.id === before);
        if (insertAtIndex === undefined) return;
      }

      console.log(previousColumn, column, cardToTransfer, copy, insertAtIndex);

      async function editTodo() {
        try {
          const editedTodo = await axios.post(
            `${URL}/todo/editTodo`,
            {
              todoId: cardToTransfer.id,
              updatedTodo: {
                todoStatus: column,
              },
            },
            {
              withCredentials: true,
            }
          );

          console.log("This is edited Todo", editedTodo);
        } catch (error) {
          console.log(error);
        }
      }

      editTodo();

      if (previousColumn == "pending")
        dispatch(removePendingTask(cardToTransfer));

      if (previousColumn == "inProgress")
        dispatch(removeInProgressTask(cardToTransfer));

      if (previousColumn == "completed")
        dispatch(removeCompletedTask(cardToTransfer));

      if (previousColumn == "deployed")
        dispatch(removeDeployedTask(cardToTransfer));

      if (previousColumn == "deferred")
        dispatch(removeDeferredTask(cardToTransfer));

      if (column == "pending")
        dispatch(createPendingTask({ cardToTransfer, insertAtIndex }));

      if (column == "inProgress")
        dispatch(createInProgressTask({ cardToTransfer, insertAtIndex }));

      if (column == "completed")
        dispatch(createCompletedTask({ cardToTransfer, insertAtIndex }));

      if (column == "deployed")
        dispatch(createDeployedTask({ cardToTransfer, insertAtIndex }));

      if (column == "deferred")
        dispatch(createDeferredTask({ cardToTransfer, insertAtIndex }));
    }
  };

  const getIndicators = () => {
    // console.log(document.querySelectorAll(`[data-column="${column}"]`));
    return Array.from(document.querySelectorAll(`[data-column="${column}"]`));
  };

  const highlightIndicator = (e) => {
    const indicator = getIndicators();
    clearHighlights(indicator);
    const element = getNearestIndicator(e, indicator);
    element.element.style.opacity = "1";
  };

  const clearHighlights = (els) => {
    const indicators = els || getIndicators();
    indicators.forEach((i) => {
      i.style.opacity = "0";
    });
  };

  const getNearestIndicator = (e, indicators) => {
    const DISTANCE_OFFSET = 50;

    const el = indicators.reduce(
      (closest, child) => {
        const box = child.getBoundingClientRect();

        const offset = e.clientY - (box.top + DISTANCE_OFFSET);

        if (offset < 0 && offset > closest.offset) {
          return { offset: offset, element: child };
        } else {
          return closest;
        }
      },
      {
        offset: Number.NEGATIVE_INFINITY,
        element: indicators[indicators.length - 1],
      }
    );

    return el;
  };

  return (
    <div className="w-56 shrik-0">
      <div
        className={`flex items-center justify-between bg-white rounded-t-md border-t-4 ${borderColor}`}
      >
        <div className="flex w-full p-2 justify-between items-center gap-2 border">
          <div className="flex gap-2 ">
            <h3 className={`font-medium ${headingColor}`}>{title}</h3>
            <span className="rounded text-sm text-gray-800 border px-1 border-2 flex items-center">
              {filterdColumns.length}
            </span>
          </div>
          <motion.button
            layout
            onClick={() => setOpenTask(!openTask)}
            className=""
          >
            {!openCreateTask ? <FiPlusCircle /> : <MdOutlineCancel />}
          </motion.button>
        </div>
      </div>
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDragEnd}
        className={`h-full flex flex-col gap-1 relative w-full transition-colors ${
          active ? `${backgroundColor} opacity-50` : ``
        }`}
      >
        {console.log(filterdColumns, "askfdjlaksjfd")}
        {filterdColumns.map((item, index) => (
          <Card key={item.id} {...item} handleDragStart={handleDragStart} />
        ))}
        <Indicator before="-1" column={column} />
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
              <AddTask
                status={column}
                openTask={openTask}
                setOpenTask={setOpenTask}
              />
            </div>
          </div>
        )}
        {/* <AddCard column={column} setCards={setCards} /> */}
      </div>
    </div>
  );
};

export default Status;
