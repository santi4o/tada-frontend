import { useReducer, useEffect } from "react";
import TasksContext from "./tasks-context";

const defaultTasksState = {
  list: [],
  page: 0,
  totalPages: 1,
  sorting: [],
};

function tasksReducer(state, action) {
  if (action.type === "SET_LIST") {
    return {
      list: action.list,
      page: action.page,
      totalPages: action.totalPages,
      sorting: state.sorting,
    };
  } else if (action.type === "CHANGE_PAGE") {
    return {
      list: state.list,
      page: action.page,
      totalPages: state.totalPages,
      sorting: state.sorting,
    };
  } else if (action.type === "UPDATE_SORTING") {
    // console.log("updating sorting")
    let newSorting = [...state.sorting];
    const index = newSorting.findIndex((by) => by.property === action.property);

    if (index !== -1) {
      newSorting[index].direction = (newSorting[index].direction + 1) % 3;
      console.log(newSorting[index].direction);
    } else {
      // console.log(action.property)
      newSorting.push({ property: action.property, direction: 1 });
    }

    newSorting = newSorting.filter((by) => by.direction !== 0);

    console.log(newSorting);

    return {
      list: state.list,
      page: state.page,
      totalPages: state.totalPages,
      sorting: newSorting,
    };
  }

  return defaultTasksState;
}

export default function TasksProvider({ children }) {
  const [tasksState, dispatchTasksAction] = useReducer(
    tasksReducer,
    defaultTasksState
  );

  const directionDict = {
    1: "ASC",
    2: "DESC",
  };

  function addTaskHandler(task) {}
  function removeTaskHandler(id) {}
  function updateTaskHandler(id) {}

  useEffect(() => {
    // console.log("fetching data...")
    let sortingQueryParams = "&sorting=";

    tasksContext.sorting.forEach((by, i) => {
      if (by.direction) {
        sortingQueryParams += by.property + "-" + directionDict[by.direction];
        if (i !== tasksContext.sorting.length - 1) {
          sortingQueryParams += ",";
        }
      }
    });

    let urlReq =
      "http://localhost:8080/todos?pageNumber=" +
      tasksState.page +
      "&pageSize=10";

    sortingQueryParams != "&sorting=" && (urlReq += sortingQueryParams);
    console.log(urlReq);

    fetch(urlReq, {
      method: "GET",
      mode: "cors",
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        // console.log(data);
        dispatchTasksAction({
          type: "SET_LIST",
          list: data.content,
          page: data.number,
          totalPages: data.totalPages,
        });
      });
  }, [tasksState.sorting, tasksState.page]);

  function handlePageChange(page) {
    if (page < 0 || page >= tasksState.totalPages) {
      return;
    }
    //fetchTasks(page);
    dispatchTasksAction({ type: "CHANGE_PAGE", page });
  }

  function updateSortingHandler(property) {
    dispatchTasksAction({ type: "UPDATE_SORTING", property: property });
    //fetchTasks(tasksContext.page);
  }

  const tasksContext = {
    list: tasksState.list,
    page: tasksState.page,
    totalPages: tasksState.totalPages,
    sorting: tasksState.sorting,
    addTask: addTaskHandler,
    removeTask: removeTaskHandler,
    updateTask: updateTaskHandler,
    changePage: handlePageChange,
    updateSorting: updateSortingHandler,
  };

  return (
    <TasksContext.Provider value={tasksContext}>
      {children}
    </TasksContext.Provider>
  );
}
