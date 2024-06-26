import React from "react";
import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
  pending: [],
  inProgress: [],
  completed: [],
  deployed: [],
  deferred: [],
  openCreateTask: false,
};

const findAndUpdateTask = (tasks, id, newTask) => {
  const index = tasks.findIndex((task) => task.id === id);
  if (index !== -1) {
    tasks[index] = { ...tasks[index], ...newTask };
    return tasks;
  }
  return tasks;
};

const taskReducer = createSlice({
  name: "task",
  initialState,
  reducers: {
    openTask: (state) => {
      state.openCreateTask = !state.openCreateTask;
    },
    editTask: (state, action) => {
      console.log(action.payload);
      const { id, todo } = action.payload;

      state.pending = findAndUpdateTask(state.pending, id, todo);
      state.inProgress = findAndUpdateTask(state.inProgress, id, todo);
      state.completed = findAndUpdateTask(state.completed, id, todo);
      state.deployed = findAndUpdateTask(state.deployed, id, todo);
      state.deferred = findAndUpdateTask(state.deferred, id, todo);
    },
    createPendingTask: (state, action) => {
      let newTask = state.pending;
      newTask.splice(action.payload.insertAtIndex, 0, action.payload.todo);
      state.pending = newTask;
    },
    removePendingTask: (state, action) => {
      state.pending = state.pending.filter(
        (task) => task?._id != action.payload._id
      );
    },
    createInProgressTask: (state, action) => {
      let newTask = [...state.inProgress];
      // console.log(newTask, action.payload, state.inProgress);
      newTask.splice(action.payload.insertAtIndex, 0, action.payload.todo);
      state.inProgress = newTask;
    },
    removeInProgressTask: (state, action) => {
      // console.log(action)
      state.inProgress = state.inProgress.filter(
        (task) => task?._id != action.payload._id
      );
    },
    createCompletedTask: (state, action) => {
      let newTask = state.completed;
      newTask.splice(action.payload.insertAtIndex, 0, action.payload.todo);
      state.completed = newTask;
    },
    removeCompletedTask: (state, action) => {
      console.log(current(state.completed), action.payload);
      state.completed = state.completed.filter(
        (task) => task?._id != action.payload._id
      );
    },

    createDeferredTask: (state, action) => {
      let newTask = state.deployed;
      newTask.splice(action.payload.insertAtIndex, 0, action.payload.todo);
      state.deferred = newTask;
    },
    removeDeferredTask: (state, action) => {
      state.deferred = state.deferred.filter(
        (task) => task?._id != action.payload._id
      );
    },
    clearAllTask: (state) => {
      state.pending = [];
      state.inProgress = [];
      state.completed = [];
      state.deployed = [];
      state.deferred = [];
      state.openCreateTask = false;
    },
  },
});

export const {
  openTask,
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
  clearAllTask,
  editTask,
} = taskReducer.actions;

export default taskReducer.reducer;
