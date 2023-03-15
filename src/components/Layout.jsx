import { useContext } from "react";
import ThemeContext from "../store/theme-context";

export default function Layout({ children }) {
  const themeContext = useContext(ThemeContext);

  return (
    <>
      <nav className="m-1 sm:m-2 ring-1 ring-gray-200 bg-white rounded-lg shadow-lg px-2 sm:px-4 py-2.5 dark:bg-gray-900">
        <div className="container flex flex-wrap items-center justify-between mx-auto">
          <img
            src="tada-white.svg"
            className="h-6 mr-3 sm:h-9 dark:hidden"
            alt="Flowbite Logo"
          />
          <img
            src="tada.svg"
            className="h-6 mr-3 sm:h-9 hidden dark:inline-block"
            alt="Flowbite Logo"
          />

          <div className="flex items-center md:w-auto" id="navbar-default">
            <button
              id="theme-toggle"
              type="button"
              onClick={() => themeContext.handleToggleTheme()}
              className="md:mr-6 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5"
            >
              <svg
                id="theme-toggle-dark-icon"
                className="block dark:hidden w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
              </svg>
              <svg
                id="theme-toggle-light-icon"
                className="hidden dark:block w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                  fillRule="evenodd"
                  clipRule="evenodd"
                />
              </svg>
            </button>

            <a
              href="#"
              className="text-sm font-medium block pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
            >
              About
            </a>
          </div>
        </div>
      </nav>

      <main className="mt-8 p-1 sm:p-2">{children}</main>
    </>
  );
}