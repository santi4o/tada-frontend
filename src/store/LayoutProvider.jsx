import LayoutContext from "./layout-context";
import { useState, useEffect } from "react";

export default function LayoutProvider({ children }) {
  const [darkTheme, setDarkTheme] = useState(false);
  const [showNewTaskModal, setShowNewTaskModal] = useState(false);

  useEffect(() => {
    if (
      localStorage.getItem("color-theme") === "dark" ||
      (!("color-theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      setDarkTheme(true);
    } else {
      setDarkTheme(false);
    }
  }, []);

  function handleToggleTheme() {
    console.log("hola");
    if (darkTheme) {
      localStorage.setItem("color-theme", "light");
      setDarkTheme(false);
    } else {
      localStorage.setItem("color-theme", "dark");
      setDarkTheme(true);
    }
  }

  function handleSetShowNewTaskModal(show) {
    setShowNewTaskModal(show);
  }

  if (darkTheme) {
    document.body.style.backgroundColor = "black";
  } else {
    document.body.style.backgroundColor = "white";
  }

  const layoutContext = {
    dark: darkTheme,
    showNewTaskModal,
    handleToggleTheme,
    setShowNewTaskModal: handleSetShowNewTaskModal
  }

  return (
    <LayoutContext.Provider value={layoutContext}>
      {children}
    </LayoutContext.Provider>
  );
}
