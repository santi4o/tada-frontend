import ReactDOM from "react-dom";
import Datepicker from "react-tailwindcss-datepicker";
import Modal from "./shared/Modal";
import InputTextFloatingLabel from "./shared/InputTextFloatingLabel";
import InputSelect from "./shared/InputSelect";
import Button from "./shared/Button";
import { useState, useRef } from "react";
import { PRIORITIES } from "../config/priorities";

function NewTaskForm() {
  const [dueDate, setDueDate] = useState({
    startDate: null,
    endDate: null,
  });

  const nameInputRef = useRef();
  const prioritySelectRef = useRef();

  function handleDueDateChange(newValue) {
    console.log("newValue:", newValue);
    setDueDate(newValue);
  }

  function handleAddTask() {
    console.log(nameInputRef.current.value);
    console.log(prioritySelectRef.current.value);
    console.log(dueDate);
  }

  return (
    <div className="flex flex-col">
      <InputTextFloatingLabel myRef={nameInputRef} label="Name" placeholder="A magic To-Do 🌟" />
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
  function handleSave() {
    console.log("this task will be saved, i promise");
  }
  return (
    <>
      {ReactDOM.createPortal(
        <Modal title="Add new To-Do">
          <NewTaskForm onSave={handleSave} />
        </Modal>,
        document.getElementById("modal-root")
      )}
    </>
  );
}
