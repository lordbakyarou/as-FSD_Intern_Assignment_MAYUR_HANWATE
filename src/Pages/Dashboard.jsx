import React, { useEffect, useState } from "react";
import Status from "../Component/Status";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
  clearAllTask,
  createCompletedTask,
  createDeferredTask,
  createInProgressTask,
  createPendingTask,
} from "../redux/features/taskSlice/taskSlice";

import { useNavigate } from "react-router-dom";

const URL = import.meta.env.VITE_API_URL;

const Dashboard = () => {
  // const [cards, setCards] = useState(DEFAULT_CARDS);
  const cards = useSelector((state) => state.task);
  console.log("cards", cards);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    async function checkIfUserLogin() {
      try {
        await axios.get(`${URL}/auth/check`, { withCredentials: true });
      } catch (error) {
        console.log(error);
        navigate("/");
      }
    }
    checkIfUserLogin();
  }, []);

  return (
    <div className="flex justify-evenly gap-2 mt-20 w-full ">
      <Status
        title="Pending"
        column="pending"
        headingColor="text-neutral-300"
        borderColor="border-neutral-300"
        backgroundColor="bg-neutral-300"
        cards={cards.pending}
        // setCards={setCards}
      />

      <Status
        title="In Progress"
        column="inProgress"
        headingColor="text-blue-300"
        borderColor="border-blue-300"
        backgroundColor="bg-blue-300"
        cards={cards.inProgress}
        // setCards={setCards}
      />

      <Status
        title="Completed"
        column="completed"
        headingColor="text-yellow-200"
        borderColor="border-yellow-200"
        backgroundColor="bg-yellow-300"
        cards={cards.completed}
        // setCards={setCards}
      />
      <Status
        title="Deferred"
        column="deferred"
        headingColor="text-red-300"
        borderColor="border-red-300"
        backgroundColor="bg-red-300"
        cards={cards.deferred}
        // setCards={setCards}
      />
    </div>
  );
};

export default Dashboard;
