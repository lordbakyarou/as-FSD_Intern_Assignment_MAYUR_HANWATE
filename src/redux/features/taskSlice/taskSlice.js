import React from "react";
import { createSlice } from "@reduxjs/toolkit";

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
      const { id, cardToEdit } = action.payload;
      state.pending = findAndUpdateTask(state.pending, id, cardToEdit);
      state.inProgress = findAndUpdateTask(state.inProgress, id, cardToEdit);
      state.completed = findAndUpdateTask(state.completed, id, cardToEdit);
      state.deployed = findAndUpdateTask(state.deployed, id, cardToEdit);
      state.deferred = findAndUpdateTask(state.deferred, id, cardToEdit);
    },
    createPendingTask: (state, action) => {
      let newTask = state.pending;
      newTask.splice(
        action.payload.insertAtIndex,
        0,
        action.payload.cardToTransfer
      );
      state.pending = newTask;
    },
    removePendingTask: (state, action) => {
      state.pending = state.pending.filter(
        (task) => task.id != action.payload.id
      );
    },
    createInProgressTask: (state, action) => {
      let newTask = [...state.inProgress];
      console.log(newTask, action.payload, state.inProgress);
      newTask.splice(
        action.payload.insertAtIndex,
        0,
        action.payload.cardToTransfer
      );
      state.inProgress = newTask;
    },
    removeInProgressTask: (state, action) => {
      // console.log(action)
      state.inProgress = state.inProgress.filter(
        (task) => task.id != action.payload.id
      );
    },
    createCompletedTask: (state, action) => {
      let newTask = state.completed;
      newTask.splice(
        action.payload.insertAtIndex,
        0,
        action.payload.cardToTransfer
      );
      state.completed = newTask;
    },
    removeCompletedTask: (state, action) => {
      state.completed = state.completed.filter(
        (task) => task.id != action.payload.id
      );
    },
    createDeployedTask: (state, action) => {
      let newTask = state.deployed;
      newTask.splice(
        action.payload.insertAtIndex,
        0,
        action.payload.cardToTransfer
      );
      state.deployed = newTask;
    },
    removeDeployedTask: (state, action) => {
      state.deployed = state.deployed.filter(
        (task) => task.id != action.payload.id
      );
    },
    createDeferredTask: (state, action) => {
      let newTask = state.deferred;
      newTask.splice(
        (action.payload.insertAtIndex = state.length),
        0,
        action.payload.cardToTransfer
      );
      state.deferred = newTask;
    },
    removeDeferredTask: (state, action) => {
      state.deferred = state.deferred.filter(
        (task) => task.id != action.payload.id
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
