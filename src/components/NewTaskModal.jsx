import ReactDOM from "react-dom";
import DatePicker from "react-datepicker";
import { CalendarContainer } from "react-datepicker";
import Modal from "./shared/Modal";
import InputTextFloatingLabel from "./shared/InputTextFloatingLabel";
import InputSelect from "./shared/InputSelect";
import Button from "./shared/Button";
import { useState, useRef, useContext } from "react";
import { PRIORITIES } from "../config/priorities";
import TasksContext from "../store/tasks-context";
import LayoutContext from "../store/layout-context";
import { forwardRef } from "react";

function NewTaskForm() {
  const [dueDate, setDueDate] = useState(null);

  const [clickedAdd, setClickedAdd] = useState(false);

  const prioritySelectRef = useRef();
  const nameInputRef = useRef();

  const tasksContext = useContext(TasksContext);
  const layoutContext = useContext(LayoutContext);

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
      dueDate: dueDate
        ? new Date(dueDate).toISOString().replace("Z", "CST")
        : null,
    });
    layoutContext.setShowNewTaskModal(false);
  }

  const ExampleCustomInput = forwardRef(({ value, onClick, onClear }, ref) => (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <svg
          aria-hidden="true"
          className="w-5 h-5 text-gray-500 dark:text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
          />
        </svg>
      </div>
      <input
        type="search"
        id="default-search"
        className="block w-full p-2.5 pl-10 text-sm text-gray-900 border border-gray-300 rounded-md bg-gray-50 focus:ring-black focus:border-black dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Optional"
        value={value}
        onClick={onClick}
        readOnly
        ref={ref}
      />
      <button
        onClick={onClear}
        className="text-white absolute rounded-md rounded-l-none right-0 bottom-0 bg-blue-700 hover:bg-blue-800 border border-gray-300 focus:outline-none font-medium text-sm px-4 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        X
      </button>
    </div>
  ));

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
            <div className="flex">
              <DatePicker
                selected={dueDate}
                onChange={(date) => setDueDate(date)}
                dateFormat="yyyy/MM/dd"
                placeholderText="YYYY/MM/DD"
                calendarContainer={MyContainer}
                customInput={
                  <ExampleCustomInput
                    onClear={() => {
                      setDueDate(null);
                    }}
                  />
                }
              />
            </div>
          </div>
          <Button buttonText="Add" handleClick={handleAddTask} />
        </div>
      </div>
    </div>
  );
}

function MyContainer({ className, children }) {
  return (
    <div className="relative inline-block font-medium group bg-white p-2 rounded-lg shadow-2xl border-2 border-black mr-2">
      <span className="absolute -z-10 top-1.5 left-1.5 rounded-lg inset-0 w-full h-full  bg-black"></span>

      <CalendarContainer className={className + " bg-white border-none"}>
        <div style={{ position: "relative" }}>{children}</div>
      </CalendarContainer>
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
