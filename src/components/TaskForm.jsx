import DatePicker from "react-datepicker";
import { CalendarContainer } from "react-datepicker";
import InputTextFloatingLabel from "./shared/InputTextFloatingLabel";
import InputSelect from "./shared/InputSelect";
import DateInput from "./shared/DateInput";
import Button from "./shared/Button";
import { useState, useRef, useContext, useEffect } from "react";
import { PRIORITIES } from "../config/priorities";
import TasksContext from "../store/tasks-context";
import LayoutContext from "../store/layout-context";

export default function TaskForm() {
  const [dueDate, setDueDate] = useState(null);

  const [clickedAdd, setClickedAdd] = useState(false);

  const prioritySelectRef = useRef();
  const nameInputRef = useRef();

  const tasksContext = useContext(TasksContext);
  const layoutContext = useContext(LayoutContext);

  useEffect(() => {
    if (!layoutContext.updatingTask) {
      return;
    }
    nameInputRef.current.value = layoutContext.updatingTask.text;
    prioritySelectRef.current.value = layoutContext.updatingTask.priority;
    layoutContext.updatingTask.dueDate &&
      setDueDate(new Date(layoutContext.updatingTask.dueDate));
  }, []);

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

  function handleSave() {
    if (!nameInputRef.current.value) {
      nameInputRef.current.focus();
      nameInputRef.current.className =
        "block rounded-md w-full py-2.5 pr-2 text-sm text-gray-900 bg-gray-50 border border-red-500 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-red-500 focus:border-red-500 placeholder-transparent focus:placeholder-gray-500 peer";

      setClickedAdd(true);
      return;
    }
    
    let newDueDate = dueDate ? new Date(dueDate) : null;
    newDueDate && newDueDate.setHours(0, 0, 0, 0);

    if (layoutContext.updatingTask) {
      tasksContext.updateTask({
        id: layoutContext.updatingTask.id,
        text: nameInputRef.current.value,
        priority: prioritySelectRef.current.value,
        dueDate: newDueDate
          ? new Date(newDueDate).toISOString().replace("Z", "CST")
          : null,
      });
    } else {
      tasksContext.addTask({
        text: nameInputRef.current.value,
        priority: prioritySelectRef.current.value,
        dueDate: newDueDate
          ? new Date(newDueDate).toISOString().replace("Z", "CST")
          : null,
      });
    }
    layoutContext.hideTaskModal();
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
            <div className="flex">
              <DatePicker
                selected={dueDate}
                onChange={(date) => setDueDate(date)}
                todayButton="Today"
                dateFormat="yyyy/MM/dd"
                placeholderText="YYYY/MM/DD"
                calendarContainer={MyContainer}
                customInput={
                  <DateInput
                    onClear={() => {
                      setDueDate(null);
                    }}
                  />
                }
              />
            </div>
          </div>
          <Button
            buttonText={layoutContext.updatingTask ? "Save changes" : "Add"}
            handleClick={handleSave}
          />
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
