import { configureStore } from '@reduxjs/toolkit';
import taskReducer from '../features/tasks/tasksSlice';
import localStorageMiddleware from './localStorageMiddleware';

const preloadedState = {
  tasks: JSON.parse(localStorage.getItem('tasks')) || [],
};

export const store = configureStore({
  reducer: {
    tasks: taskReducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(localStorageMiddleware),
  preloadedState,
});
