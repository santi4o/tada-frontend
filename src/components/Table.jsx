import { TASK_TABLE_PROPS } from "../config/task-properties";
import TableRow from "./TableRow";
import { useContext } from "react";
import TasksContext from "../store/tasks-context";

export default function Table() {
  const tasksContext = useContext(TasksContext);

  return (
    <div className="relative overflow-x-auto shadow-lg sm:rounded-lg w-full mx-auto">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            {TASK_TABLE_PROPS.map((prop) => (
              <th key={prop.value} scope="col" className="px-4 py-3">
                <a
                  className={
                    "flex items-center w-fit" +
                    (prop.sortable ? " hover:cursor-pointer" : "")
                  }
                  onClick={() => {
                    prop.sortable && tasksContext.updateSorting(prop.value);
                  }}
                >
                  {prop.viewValue}
                  {prop.sortable &&
                    genSvgIcon(tasksContext.sorting, prop.value)}
                </a>
              </th>
            ))}
            <th scope="col" className="px-4 py-3 text-center">
              <span>Actions</span>
            </th>
          </tr>
        </thead>

        <tbody>
          {tasksContext.list.map((task) => (
            <TableRow key={task.id} task={task} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

function genSvgIcon(sorting, prop) {
  const dict = {
    0: (
      <path d="M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z" />
    ),
    1: (
      <path d="M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224z" />
    ),
    2: (
      <path d="M292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z" />
    ),
  };

  const propSortingIndex = sorting.findIndex((by) => by.property === prop);
  let direction = 0;
  if (propSortingIndex !== -1) {
    direction = sorting[propSortingIndex].direction;
  }

  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-3 h-3 ml-1 fill-green"
        aria-hidden="true"
        // fill="currentColor"
        viewBox="0 0 320 512"
      >
        {dict[direction]}
      </svg>
      <p className="w-1">
        {propSortingIndex !== -1 ? propSortingIndex + 1 : " "}
      </p>
    </>
  );
}
