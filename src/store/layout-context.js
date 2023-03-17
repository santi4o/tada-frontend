import React from "react";

const LayoutContext = React.createContext({
    dark: false,
    showNewTaskModal: false,
    handleToggleTheme: () => {},
    setShowNewTaskModal: (show) => {}
});

export default LayoutContext;