import { useContext } from "react";
import ReactDOM from "react-dom";
import LayoutContext from "../store/layout-context";
import Button from "./shared/Button";
import Modal from "./shared/Modal";

export default function InfoModal({ title, message }) {
  const layoutContext = useContext(LayoutContext);

  return (
    <>
      {ReactDOM.createPortal(
        <Modal title={title ? title : (layoutContext.updatingTask ? "Edit to-do" : "Add new to-do")}>
          <div>
            {message}
            </div>
            <div className="flex justify-end">

            <Button buttonText="OK" handleClick={() => {layoutContext.hideLastModal()}}/>
            </div>
        </Modal>,
        document.getElementById("modal-root")
      )}
    </>
  );
}
