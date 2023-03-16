import React from "react";

const TasksContext = React.createContext({
    list: [],
    page: 0,
    totalPages: 1,
    sorting: [],
    filters: [],
    addTask: (task) => {},
    removeTask: (id) => {},
    updateTask: (id) => {},
    changePage: (page) => {},
    updateSorting: (sortBy) => {},
    updateFilters: (filters) => {}
});

export default TasksContext;