import { useContext } from "react";
import ReactDOM from "react-dom";
import LayoutContext from "../store/layout-context";
import Modal from "./shared/Modal";
import TaskForm from "./TaskForm";

export default function TaskModal() {
  const layoutContext = useContext(LayoutContext);

  return (
    <>
      {ReactDOM.createPortal(
        <Modal title={layoutContext.updatingTask ? "Edit to-do" : "Add new to-do"}>
          <TaskForm />
        </Modal>,
        document.getElementById("modal-root")
      )}
    </>
  );
}
