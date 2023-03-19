import { TASK_TABLE_PROPS } from "../config/task-properties";
import format from "date-fns/format";
import { useContext } from "react";
import LayoutContext from "../store/layout-context";
import TasksContext from "../store/tasks-context";

export default function TableRow({ task }) {
  const layoutContext = useContext(LayoutContext);
  const tasksContext = useContext(TasksContext);

  function handleOnStatusChange() {
    if (task.done) {
      tasksContext.markTaskAsPending(task.id);
    } else {
      tasksContext.markTaskAsDone(task.id);
    }
  }

  function genCheckBox(value) {
    return (
      <input
        id="default-checkbox"
        type="checkbox"
        checked={value}
        onChange={() => handleOnStatusChange()}
        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
      ></input>
    );
  }

  function genPriority(value) {
    const PRIORITY_DICT = {
      0: "Low",
      1: "Medium",
      2: "High",
    };

    return PRIORITY_DICT[value];
  }

  function genDate(value) {
    return value ? format(new Date(value), "yyyy/MM/dd") : "";
  }

  function genCell(prop, value) {
    const PROP_RENDER = {
      done: genCheckBox,
      dueDate: genDate,
      priority: genPriority,
    };

    const cellValue =
      prop.value in PROP_RENDER ? PROP_RENDER[prop.value](value) : value;

    return prop.bold ? (
      <th
        key={prop.value}
        scope="row"
        className="px-4 py-4 font-medium text-gray-900 whitespace-normal dark:text-white"
      >
        {/* {cellValue.length > 50 ? cellValue.slice(0,50) + " ..." : cellValue}<br></br>
        hola */}
        <p className="">{cellValue}</p>
      </th>
    ) : (
      <td key={prop.value} className="px-4 py-4">
        {cellValue}
      </td>
    );
  }

  return (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
      {TASK_TABLE_PROPS.map((prop) => genCell(prop, task[prop.value]))}
      <td className="px-4 py-4 align-middle">
        <div className="flex justify-center">
          <button onClick={() => layoutContext.doShowTaskModal(task)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 fill-gray-600 mr-3 hover:fill-black"
            >
              <path d="M5.433 13.917l1.262-3.155A4 4 0 017.58 9.42l6.92-6.918a2.121 2.121 0 013 3l-6.92 6.918c-.383.383-.84.685-1.343.886l-3.154 1.262a.5.5 0 01-.65-.65z" />
              <path d="M3.5 5.75c0-.69.56-1.25 1.25-1.25H10A.75.75 0 0010 3H4.75A2.75 2.75 0 002 5.75v9.5A2.75 2.75 0 004.75 18h9.5A2.75 2.75 0 0017 15.25V10a.75.75 0 00-1.5 0v5.25c0 .69-.56 1.25-1.25 1.25h-9.5c-.69 0-1.25-.56-1.25-1.25v-9.5z" />
            </svg>
          </button>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 fill-gray-600 hover:fill-black"
          >
            <path
              fillRule="evenodd"
              d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </td>
    </tr>
  );
}
