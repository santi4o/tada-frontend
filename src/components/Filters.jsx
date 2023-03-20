import Button from "./shared/Button";
import InputText from "./shared/InputText";
import InputSelect from "./shared/InputSelect";
import { PRIORITIES } from "../config/priorities";
import { DONE_STATUS } from "../config/done-status";
import TasksContext from "../store/tasks-context";
import { useContext, useRef } from "react";

export default function Filters() {
  const tasksContext = useContext(TasksContext);
  const nameInputRef = useRef();
  const prioritySelectRef = useRef();
  const statusSelectRef = useRef();

  function handleSearch() {
    // console.log(statusSelectRef.current.value)
    tasksContext.updateFilters([
      { property: "name", value: nameInputRef.current.value },
      { property: "priority", value: prioritySelectRef.current.value },
      { property: "done", value: statusSelectRef.current.value },
    ]);
  }

  function handleClear() {
    nameInputRef.current.value = "";
    prioritySelectRef.current.value = -1;
    statusSelectRef.current.value = "";
    tasksContext.updateFilters([]);
  }

  let searchSvg = (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
    ></path>
  );

  return (
    <div className="mx-auto w-full p-4 border border-gray-100 bg-white rounded-md shadow-lg dark:bg-gray-800 dark:border-gray-700">
      <div className="table">
        <div className="table-row-group">
          <div className="table-row">
            <label htmlFor="" className="table-cell dark:text-white">
              Name
            </label>
            <div className="table-cell w-full">
              <InputText
                myRef={nameInputRef}
                placeholder="Search for to-dos containing this words"
              ></InputText>
            </div>
          </div>
          <div className="table-row">
            <label className="table-cell pr-2 dark:text-white" htmlFor="">
              Priority
            </label>
            <div className="flex my-2">
              <div className="w-full sm:w-fit">
                <InputSelect
                  id="priority"
                  options={PRIORITIES}
                  myRef={prioritySelectRef}
                />
              </div>
            </div>
          </div>
          <div className="table-row">
            <label className="table-cell w-8 dark:text-white" htmlFor="">
              Status
            </label>
            <div className="flex flex-col sm:flex-row justify-between md:items-end">
              <div>
                <InputSelect
                  id="status"
                  options={DONE_STATUS}
                  myRef={statusSelectRef}
                />
              </div>
              <div className="mt-2 sm:mt-0 flex flex-col sm:flex-row">
                <div
                  className={
                    "mb-2 sm:mr-3 sm:mb-0" +
                    (tasksContext.filters.length ? "" : " hidden")
                  }
                >
                  <Button
                    buttonText="Clear filters"
                    handleClick={handleClear}
                  ></Button>
                </div>
                <Button buttonText="Search" handleClick={handleSearch}></Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
