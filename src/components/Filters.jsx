import Button from "./Button";
import InputText from "./InputText";
import InputSelect from "./InputSelect";
import { PRIORITIES } from "../config/priorities";
import { DONE_STATUS } from "../config/done-status";

export default function Filters() {
    let searchSvg = (
        <path strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
    );

    return (
        <div className="mx-auto md:max-w-xl p-4 border border-gray-100 bg-white rounded-md shadow-xl">
            <div className="mt-0">
                <InputText label="Name"
                    placeholder="Search for to-dos containing this words"
                    iconPath={searchSvg}></InputText>
            </div>
            <div className="flex mt-3">
                <div className="md:w-1/2 flex">
                    <div className="md:mr-4">
                        <InputSelect label="Priority" id="priority" options={PRIORITIES}></InputSelect>
                    </div>
                    <div className="mt-0">
                        <InputSelect label="Status" id="status" options={DONE_STATUS}></InputSelect>
                    </div>
                </div>
                <div className="md:w-1/2 flex md:justify-end md:items-end">
                    <Button
                        buttonText="Search"
                    ></Button>
                </div>
            </div>

        </div>
    );
}