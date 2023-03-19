import React from "react";

const LayoutContext = React.createContext({
    dark: false,
    showTaskModal: false,
    updatingTask: null,
    handleToggleTheme: () => {},
    doShowTaskModal: (task) => {},
    hideTaskModal: () => {}
});

export default LayoutContext;