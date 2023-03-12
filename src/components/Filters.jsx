import Button from "./shared/Button";
import InputText from "./shared/InputText";
import InputSelect from "./shared/InputSelect";
import { PRIORITIES } from "../config/priorities";
import { DONE_STATUS } from "../config/done-status";

export default function Filters() {
  let searchSvg = (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
    ></path>
  );

  return (
    <div className="mx-auto md:max-w-xl p-4 border border-gray-100 bg-white rounded-md shadow-lg">
      <div className="table">
        <div className="table-row-group">
          <div className="table-row">
            <label htmlFor="" className="table-cell">
              Name
            </label>
            <div className="table-cell w-full">
              <InputText placeholder="Search for to-dos containing this words"></InputText>
            </div>
          </div>
          <div className=" table-row">
            <label className="table-cell pr-2" htmlFor="">
              Priority
            </label>
            <div className="flex">
              <div>
                <InputSelect id="priority" options={PRIORITIES}></InputSelect>
              </div>
            </div>
          </div>
          <div className="table-row">
            <label className="table-cell w-8" htmlFor="">
              Status
            </label>
            <div className="flex justify-between items-end">
              <div>
                <InputSelect id="status" options={DONE_STATUS}></InputSelect>
              </div>
              <div>
                <Button buttonText="Search"></Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
