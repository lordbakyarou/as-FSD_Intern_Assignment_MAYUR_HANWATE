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
    <div className="flex justify-center gap-20 mt-10 w-full ">
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

const DEFAULT_CARDS = [
  // BACKLOG
  { title: "Look into render bug in dashboard", id: "1", column: "pending" },
  { title: "SOX compliance checklist", id: "2", column: "pending" },
  { title: "[SPIKE] Migrate to Azure", id: "3", column: "pending" },
  { title: "Document Notifications service", id: "4", column: "pending" },
  // TODO
  {
    title: "Research DB options for new microservice",
    id: "5",
    column: "inProgress",
  },
  { title: "Postmortem for outage", id: "6", column: "inProgress" },
  { title: "Sync with product on Q3 roadmap", id: "7", column: "inProgress" },

  // DOING
  {
    title: "Refactor context providers to use Zustand",
    id: "8",
    column: "completed",
  },
  { title: "Add logging to daily CRON", id: "9", column: "completed" },
  // DONE
  {
    title: "Set up DD dashboards for Lambda listener",
    id: "10",
    column: "deployed",
  },
];

export default Dashboard;
