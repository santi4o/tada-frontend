import { useContext } from "react";
import TasksContext from "../store/tasks-context";

export default function Stats() {
  const tasksContext = useContext(TasksContext);

  const avgTime = tasksContext.statistics.find(
    (stat) => stat.name === "avg general"
  );
  const lowTime = tasksContext.statistics.find(
    (stat) => stat.name === "avg low"
  );
  const medTime = tasksContext.statistics.find(
    (stat) => stat.name === "avg med"
  );
  const highTime = tasksContext.statistics.find(
    (stat) => stat.name === "avg high"
  );

  return (
    <div className="m-1 sm:m-2 ring-1 ring-gray-200 bg-white rounded-lg shadow-lg px-2 sm:px-4 py-2.5 dark:bg-gray-700 dark:ring-0 flex justify-around text-sm text-gray-700 dark:text-gray-300">
      <div className="p-2 flex flex-col">
        <p className="mb-2">Average time to finish tasks:</p>
        <div className="grow flex justify-center items-center">
        <div className="flex items-center">
          <svg
            fill="currentColor"
            className="w-3 h-3 mr-1"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              clipRule="evenodd"
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-13a.75.75 0 00-1.5 0v5c0 .414.336.75.75.75h4a.75.75 0 000-1.5h-3.25V5z"
            />
          </svg>
          <p>
            {!avgTime || avgTime.value === -1
              ? "Not enough data"
              : formatTime(avgTime.value)}
          </p>
          </div>
        </div>
      </div>
      <div className="p-2">
        <p className="mb-2">Average time to finish tasks by priority:</p>
        <div className="flex items-center">
          <svg
            fill="currentColor"
            className="w-3 h-3 mr-1"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              clipRule="evenodd"
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-13a.75.75 0 00-1.5 0v5c0 .414.336.75.75.75h4a.75.75 0 000-1.5h-3.25V5z"
            />
          </svg>
          <p>
            Low:{" "}
            {!lowTime || lowTime.value === -1
              ? "Not enough data"
              : formatTime(lowTime.value)}
          </p>
        </div>
        <div className="flex items-center">
          <svg
            fill="currentColor"
            className="w-3 h-3 mr-1"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              clipRule="evenodd"
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-13a.75.75 0 00-1.5 0v5c0 .414.336.75.75.75h4a.75.75 0 000-1.5h-3.25V5z"
            />
          </svg>
          <p>
            Medium:{" "}
            {!medTime || medTime.value === -1
              ? "Not enough data"
              : formatTime(medTime.value)}
          </p>
        </div>
        <div className="flex items-center">
          <svg
            fill="currentColor"
            className="w-3 h-3 mr-1"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              clipRule="evenodd"
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-13a.75.75 0 00-1.5 0v5c0 .414.336.75.75.75h4a.75.75 0 000-1.5h-3.25V5z"
            />
          </svg>
          <p>
            High:{" "}
            {!highTime || highTime.value === -1
              ? "Not enough data"
              : formatTime(highTime.value)}
          </p>
        </div>
      </div>
    </div>
  );
}

function formatTime(seconds) {
  if (seconds < 60) {
    return seconds + " seconds";
  } else if (seconds < 3600) {
    return (
      Math.floor(seconds / 60) + " minutes, " + (seconds % 60) + " seconds"
    );
  } else {
    return (
      Math.floor(seconds / 3600) +
      " hours, " +
      Math.floor((seconds % 3600) / 60) +
      " minutes, " +
      (seconds % 60) +
      " seconds"
    );
  }
}
