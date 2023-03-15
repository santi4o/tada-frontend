import ThemeContext from "./theme-context";
import { useState, useEffect } from "react";

export default function ThemeProvider({ children }) {
  const [darkTheme, setDarkTheme] = useState(false);

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

  if (darkTheme) {
    document.body.style.backgroundColor = "black";
  } else {
    document.body.style.backgroundColor = "white";
  }

  return (
    <ThemeContext.Provider value={{ dark: darkTheme, handleToggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
