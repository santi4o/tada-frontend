import React from "react";

const LayoutContext = React.createContext({
    dark: false,
    showTaskModal: false,
    showInfoModal: false,
    updatingTask: null,
    handleToggleTheme: () => {},
    doShowTaskModal: (task) => {},
    doShowInfoModal: () => {},
    hideLastModal: () => {}
});

export default LayoutContext;