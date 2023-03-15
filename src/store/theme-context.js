import React from "react";

const ThemeContext = React.createContext({
    dark: false,
    handleToggleTheme: () => { }
});

export default ThemeContext;