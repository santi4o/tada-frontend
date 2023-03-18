import ReactDOM from "react-dom";
import Datepicker from "react-tailwindcss-datepicker";
import Modal from "./shared/Modal";
import InputTextFloatingLabel from "./shared/InputTextFloatingLabel";
import InputSelect from "./shared/InputSelect";
import Button from "./shared/Button";
import { useState, useRef, useContext } from "react";
import { PRIORITIES } from "../config/priorities";
import TasksContext from "../store/tasks-context";
import LayoutContext from "../store/layout-context";

function NewTaskForm() {
  const [dueDate, setDueDate] = useState({
    startDate: null,
    endDate: null,
  });

  const [clickedAdd, setClickedAdd] = useState(false);

  const prioritySelectRef = useRef();
  const nameInputRef = useRef();

  const tasksContext = useContext(TasksContext);
  const layoutContext = useContext(LayoutContext);

  function handleDueDateChange(newValue) {
    setDueDate(newValue);
  }

  function handleNameChange() {
    if (!clickedAdd) {
      return;
    } else if (nameInputRef.current.value) {
      nameInputRef.current.className =
        "block rounded-md w-full py-2.5 pr-2 text-sm text-gray-900 bg-gray-50 border border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-black focus:border-black placeholder-transparent focus:placeholder-gray-500 peer";
    } else {
      nameInputRef.current.className =
        "block rounded-md w-full py-2.5 pr-2 text-sm text-gray-900 bg-gray-50 border border-red-500 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-red-500 focus:border-red-500 placeholder-transparent focus:placeholder-gray-500 peer";
    }
  }

  function handleAddTask() {
    if (!nameInputRef.current.value) {
      nameInputRef.current.focus();
      nameInputRef.current.className =
        "block rounded-md w-full py-2.5 pr-2 text-sm text-gray-900 bg-gray-50 border border-red-500 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-red-500 focus:border-red-500 placeholder-transparent focus:placeholder-gray-500 peer";

      setClickedAdd(true);
      return;
    }
    tasksContext.addTask({
      text: nameInputRef.current.value,
      priority: prioritySelectRef.current.value,
      dueDate: dueDate.startDate
        ? new Date(dueDate.startDate).toISOString().replace("Z", "CST")
        : null,
    });
    layoutContext.setShowNewTaskModal(false);
  }

  return (
    <div className="flex flex-col">
      <InputTextFloatingLabel
        myRef={nameInputRef}
        onChange={handleNameChange}
        label="Name"
        placeholder="A magic To-Do 🌟"
        maxLength={100}
      />
      <div className="flex mt-4 items-end justify-start">
        <div className="flex flex-col mr-2">
          <InputSelect
            myRef={prioritySelectRef}
            id="priority"
            label="Priority"
            options={PRIORITIES.slice(1)}
          />
        </div>

        <div className="flex justify-between items-end flex-grow">
          <div className="flex flex-col">
            <label
              className={
                "block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              }
            >
              Due Date
            </label>
            <div>
              <Datepicker
                asSingle={true}
                useRange={false}
                value={dueDate}
                // readOnly={true}
                inputClassName="bg-gray1 border-1 border-gray-300 focus:ring-1 focus:border-1 focus:ring-blackxd focus:border-blackxd rounded-md"
                onChange={handleDueDateChange}
              />
            </div>
          </div>
          <Button buttonText="Add" handleClick={handleAddTask} />
        </div>
      </div>
    </div>
  );
}

export default function NewTaskModal() {
  return (
    <>
      {ReactDOM.createPortal(
        <Modal title="Add new To-Do">
          <NewTaskForm />
        </Modal>,
        document.getElementById("modal-root")
      )}
    </>
  );
}
