import { combineReducers, configureStore } from "@reduxjs/toolkit";
import taskReducer from "../features/taskSlice/taskSlice";
import userReducer from "../features/userSlice/userSlice";

import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const rootReducer = combineReducers({
  task: taskReducer,
  user: userReducer,
  // Add other reducers here if needed
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
});
export default store;
