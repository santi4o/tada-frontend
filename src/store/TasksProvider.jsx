import { useReducer } from "react";
import TasksContext from "./tasks-context";

const defaultTasksState = {
  list: [],
  page: 0,
  totalPages: 3
}

function tasksReducer(state, action) {
  if (action.type === "CHANGE_PAGE") {
    const newPage = action.page;
    return {
      list: state.list,
      page: newPage,
      totalPages: 3
    }
  }
  return defaultTasksState;
}

export default function TasksProvider({ children }) {
  const [tasksState, dispatchTasksAction] = useReducer(tasksReducer, defaultTasksState);

  function addTaskHandler(task) {}
  function removeTaskHandler(id) {}
  function updateTaskHandler(id) {}

  function handlePageChange(page) {
    dispatchTasksAction({ type: "CHANGE_PAGE", page });
  }

  const tasksContext = {
    list: tasksState.list,
    page: tasksState.page,
    totalPages: tasksState.totalPages,
    addTask: addTaskHandler,
    removeTask: removeTaskHandler,
    updateTask: updateTaskHandler,
    changePage: handlePageChange
  };

  return (
    <TasksContext.Provider value={tasksContext}>
      {children}
    </TasksContext.Provider>
  );
}
