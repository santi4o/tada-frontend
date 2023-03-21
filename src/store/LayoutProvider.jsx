import LayoutContext from "./layout-context";
import { useState, useEffect, useReducer } from "react";

const defaultTaskModalState = {
  show: false,
  task: null
};

function taskModalReducer(state, action) {
  if (action.type === "SHOW_MODAL") {
    return { show: true, task: action.task };
  } else if (action.type === "HIDE_MODAL") {
    return { show: false, task: null };
  }
  return defaultTaskModalState;
}

export default function LayoutProvider({ children }) {
  const [darkTheme, setDarkTheme] = useState(false);
  const [taskModalState, dispatchTaskModalAction] = useReducer(
    taskModalReducer,
    defaultTaskModalState
  );

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
    //console.log("hola");
    if (darkTheme) {
      localStorage.setItem("color-theme", "light");
      setDarkTheme(false);
    } else {
      localStorage.setItem("color-theme", "dark");
      setDarkTheme(true);
    }
  }

  function handleShowTaskModal(task) {
    dispatchTaskModalAction({ type: "SHOW_MODAL", task });
  }

  function handleHideTaskModal() {
    dispatchTaskModalAction({ type: "HIDE_MODAL" })
  }

  if (darkTheme) {
    document.body.style.backgroundColor = "black";
  } else {
    document.body.style.backgroundColor = "white";
  }

  const layoutContext = {
    dark: darkTheme,
    showTaskModal: taskModalState.show,
    updatingTask: taskModalState.task,
    handleToggleTheme,
    doShowTaskModal: handleShowTaskModal,
    hideTaskModal: handleHideTaskModal
  }

  return (
    <LayoutContext.Provider value={layoutContext}>
      {children}
    </LayoutContext.Provider>
  );
}
