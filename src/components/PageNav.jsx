import { useContext } from "react";
import TasksContext from "../store/tasks-context";

export default function PageNav() {
  const tasksContext = useContext(TasksContext);

  const notActive =
    "px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white";
  const active =
    "z-10 px-3 py-2 leading-tight text-blue-600 border border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white";
  const enabled =
    "block px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white";
  const disabled =
    "block px-3 py-2 ml-0 leading-tight text-gray-200 bg-white border border-gray-300 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white";

  return (
    <nav aria-label="Page navigation example" className="w-fit">
      <ul className="inline-flex items-center -space-x-px">
        <li>
          <a
            className={
              (tasksContext.page === 0 ? disabled : enabled) + " rounded-l-lg"
            }
            onClick={() => tasksContext.changePage(tasksContext.page - 1)}
          >
            <span className="sr-only">Previous</span>
            <svg
              aria-hidden="true"
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </a>
        </li>

        {[...Array(tasksContext.totalPages).keys()].map((i) => (
          <li key={i}>
            <a
              className={(tasksContext.page === i ? active : notActive) + " cursor-default"}
              onClick={() => tasksContext.changePage(i)}
            >
              {i + 1}
            </a>
          </li>
        ))}
        <li>
          <a
            className={
              ((tasksContext.page === tasksContext.totalPages - 1) || tasksContext.totalPages === 0
                ? disabled
                : enabled) + " rounded-r-lg"
            }
            onClick={() => tasksContext.changePage(tasksContext.page + 1)}
          >
            <span className="sr-only">Next</span>
            <svg
              aria-hidden="true"
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </a>
        </li>
      </ul>
    </nav>
  );
}
