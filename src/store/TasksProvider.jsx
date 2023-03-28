import { useReducer, useEffect, useContext } from "react";
import TasksContext from "./tasks-context";
import { API_ADDRESS, PORT, CORS_MODE } from "../config/api";
import LayoutContext from "./layout-context";

const defaultTasksState = {
  list: [],
  page: 0,
  totalPages: 1,
  sorting: [],
  filters: [],
  statistics: [],
};

function tasksReducer(state, action) {
  if (action.type === "SET_LIST") {
    return {
      list: action.list,
      page: action.page,
      totalPages: action.totalPages,
      sorting: state.sorting,
      filters: state.filters,
      statistics: action.statistics,
    };
  } else if (action.type === "CHANGE_PAGE") {
    return {
      list: state.list,
      page: action.page,
      totalPages: state.totalPages,
      sorting: state.sorting,
      filters: state.filters,
      statistics: state.statistics,
    };
  } else if (action.type === "UPDATE_SORTING") {
    // console.log("updating sorting")
    let newSorting = [...state.sorting];
    const index = newSorting.findIndex((by) => by.property === action.property);

    if (index !== -1) {
      newSorting[index].direction = (newSorting[index].direction + 1) % 3;
      // console.log(newSorting[index].direction);
    } else {
      // console.log(action.property)
      newSorting.push({ property: action.property, direction: 1 });
    }

    newSorting = newSorting.filter((by) => by.direction !== 0);
    // console.log(newSorting);

    return {
      list: state.list,
      page: state.page,
      totalPages: state.totalPages,
      sorting: newSorting,
      filters: state.filters,
      statistics: state.statistics,
    };
  } else if (action.type === "UPDATE_FILTERS") {
    const newFilters = action.filters.filter(
      (by) => by.value !== "" && by.value !== "-1"
    );

    return {
      list: state.list,
      page: 0,
      totalPages: state.totalPages,
      sorting: state.sorting,
      filters: newFilters,
      statistics: state.statistics,
    };
  }

  return defaultTasksState;
}

export default function TasksProvider({ children }) {
  const layoutContext = useContext(LayoutContext);
  const [tasksState, dispatchTasksAction] = useReducer(
    tasksReducer,
    defaultTasksState
  );

  const directionDict = {
    1: "ASC",
    2: "DESC",
  };

  useEffect(() => {
    fetchData();
  }, [tasksState.sorting, tasksState.page, tasksState.filters]);

  function fetchData() {
    //console.log("fetching data...");
    // console.log(tasksState.filters);
    let sortingQueryParams = "&sorting=";

    tasksContext.sorting.forEach((by, i) => {
      sortingQueryParams += by.property + "-" + directionDict[by.direction];
      if (i !== tasksContext.sorting.length - 1) {
        sortingQueryParams += ",";
      }
    });

    let urlReq =
      API_ADDRESS +
      ":" +
      PORT +
      "/todos?pageNumber=" +
      tasksState.page +
      "&pageSize=10";

    sortingQueryParams != "&sorting=" && (urlReq += sortingQueryParams);

    tasksContext.filters.forEach((by) => {
      urlReq += "&" + by.property + "=" + by.value;
    });
    //console.log(urlReq);

    fetch(urlReq, {
      method: "GET",
      mode: CORS_MODE,
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        //console.log(data);
        if (data.page.empty && !data.page.first) {
          //console.log("changing page?");
          dispatchTasksAction({
            type: "CHANGE_PAGE",
            page: parseInt(data.page.number) - 1,
          });
        } else {
          dispatchTasksAction({
            type: "SET_LIST",
            list: data.page.content,
            page: data.page.number,
            totalPages: data.page.totalPages,
            statistics: data.statistics,
          });
        }
      });
  }

  function handlePageChange(page) {
    if (page < 0 || page >= tasksState.totalPages) {
      return;
    }
    //fetchTasks(page);
    dispatchTasksAction({ type: "CHANGE_PAGE", page });
  }

  function updateSortingHandler(property) {
    dispatchTasksAction({ type: "UPDATE_SORTING", property });
    //fetchTasks(tasksContext.page);
  }

  function handleFiltersChange(filters) {
    dispatchTasksAction({ type: "UPDATE_FILTERS", filters });
  }

  function handleAddTask(task) {
    let urlReq = API_ADDRESS + ":" + PORT + "/todos";
    // console.log(task.dueDate);
    fetch(urlReq, {
      method: "POST",
      mode: CORS_MODE,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    })
      .then((response) => {
        if (response.status === 201) {
          fetchData();
          layoutContext.hideLastModal();
        }
        if (response.status === 400) {
          layoutContext.doShowInfoModal();
        }
      });
  }

  function handleUpdateTask(task) {
    let urlReq = API_ADDRESS + ":" + PORT + "/todos/" + task.id;
    // console.log(task.dueDate);
    fetch(urlReq, {
      method: "PUT",
      mode: CORS_MODE,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    })
      .then((response) => {
        if (response.status === 200) {
          fetchData();
          layoutContext.hideLastModal();
        }
        if (response.status === 400) {
          layoutContext.doShowInfoModal();
        }
      });
  }

  function handleMarkTaskAsDone(id) {
    let urlReq = API_ADDRESS + ":" + PORT + "/todos/" + id + "/done";
    // console.log(task.dueDate);
    fetch(urlReq, {
      method: "PATCH",
      mode: CORS_MODE,
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        // console.log(data);
        fetchData();
      });
  }

  function handleMarkTaskAsPending(id) {
    let urlReq = API_ADDRESS + ":" + PORT + "/todos/" + id + "/undone";
    // console.log(task.dueDate);
    fetch(urlReq, {
      method: "PATCH",
      mode: CORS_MODE,
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        // console.log(data);
        fetchData();
      });
  }

  function handleRemoveTask(id) {
    let urlReq = API_ADDRESS + ":" + PORT + "/todos/" + id;
    // console.log(task.dueDate);
    fetch(urlReq, {
      method: "DELETE",
      mode: CORS_MODE,
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        // console.log(data);
        fetchData();
      });
  }

  const tasksContext = {
    list: tasksState.list,
    page: tasksState.page,
    totalPages: tasksState.totalPages,
    sorting: tasksState.sorting,
    filters: tasksState.filters,
    statistics: tasksState.statistics,
    addTask: handleAddTask,
    removeTask: handleRemoveTask,
    updateTask: handleUpdateTask,
    markTaskAsDone: handleMarkTaskAsDone,
    markTaskAsPending: handleMarkTaskAsPending,
    changePage: handlePageChange,
    updateSorting: updateSortingHandler,
    updateFilters: handleFiltersChange,
  };

  return (
    <TasksContext.Provider value={tasksContext}>
      {children}
    </TasksContext.Provider>
  );
}
