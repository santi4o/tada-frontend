import React from "react";

const TasksContext = React.createContext({
    list: [],
    page: 0,
    totalPages: 1,
    addTask: (task) => { },
    removeTask: (id) => { },
    updateTask: (id) => { },
    changePage: (page) => {}
});

export default TasksContext;