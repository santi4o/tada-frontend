import { TASK_TABLE_PROPS } from "../config/task-properties";
import format from "date-fns/format";

export default function TableRow({ task }) {
    console.return(
        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            {TASK_TABLE_PROPS.map((prop) => genCell(prop, task[prop.value]))}
            <td className="px-4 py-4 text-right">
                <a
                    href="#"
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                >
                    Edit
                </a>
            </td>
        </tr>
    );

    function genCheckBox(value) {
        return value ? "done" : "pending";
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
                className="px-4 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
                {cellValue}
            </th>
        ) : (
            <td key={prop.value} className="px-4 py-4">
                {cellValue}
            </td>
        );
    }
}
