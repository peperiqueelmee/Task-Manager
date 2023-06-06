const localStorageMiddleware = store => next => action => {
  let result = next(action);
  if (action.type === 'tasks/addTask' || action.type === 'tasks/deleteTask' || action.type === 'tasks/editTask') {
    localStorage.setItem('tasks', JSON.stringify(store.getState().tasks));
  }
  return result;
};

export default localStorageMiddleware;
