import { useReducer, useEffect } from "react";
import TasksContext from "./tasks-context";

const defaultTasksState = {
  list: [],
  page: 0,
  totalPages: 1,
  sorting: []
};

function tasksReducer(state, action) {
  if (action.type === "SET_LIST") {
    return {
      list: action.list,
      page: action.page,
      totalPages: action.totalPages,
      sorting: state.sorting
    }
  }
  return defaultTasksState;
}

export default function TasksProvider({ children }) {
  const [tasksState, dispatchTasksAction] = useReducer(
    tasksReducer,
    defaultTasksState
  );

  function addTaskHandler(task) {}
  function removeTaskHandler(id) {}
  function updateTaskHandler(id) {}

  useEffect(() => {
    fetchTasksHandler(0);
  }, []);

  function fetchTasksHandler(page) {
    fetch("http://localhost:8080/todos?pageNumber=" + page + "&pageSize=2&sorting=dueDate-ASC,priority-DESC", {
      method: "GET",
      mode: "cors",
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        dispatchTasksAction({
          type: "SET_LIST",
          list: data.content,
          page: data.number,
          totalPages: data.totalPages
        });
      });
  }

  function handlePageChange(page) {
    if (page < 0 || page >= tasksState.totalPages) {
      return;
    }
    fetchTasksHandler(page);
    //dispatchTasksAction({ type: "CHANGE_PAGE", page });
  }

  const tasksContext = {
    list: tasksState.list,
    page: tasksState.page,
    totalPages: tasksState.totalPages,
    addTask: addTaskHandler,
    removeTask: removeTaskHandler,
    updateTask: updateTaskHandler,
    changePage: handlePageChange,
  };

  return (
    <TasksContext.Provider value={tasksContext}>
      {children}
    </TasksContext.Provider>
  );
}
