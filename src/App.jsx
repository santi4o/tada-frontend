import "./App.css";
import Layout from "./components/Layout";
import Filters from "./components/Filters";
import Table from "./components/Table";
import Button from "./components/shared/Button";
import PageNav from "./components/PageNav";
import TaskModal from "./components/TaskModal";
import InfoModal from "./components/InfoModal";
import { useContext } from "react";
import LayoutContext from "./store/layout-context";
import TasksContext from "./store/tasks-context";

function App() {
  const layoutContext = useContext(LayoutContext);
  const tasksContext = useContext(TasksContext);

  return (
    <div className={"App" + (layoutContext.dark ? " dark " : " ")}>
      <Layout>
        <div className="md:w-5/6 lg:max-w-3xl mx-auto">
          <Filters />
        </div>
        <div className="md:w-5/6 lg:max-w-3xl mx-auto">
          <div
            className={
              "my-4 relative" +
              (tasksContext.filters.length ? " pb-10 sm:pb-0" : "")
            }
          >
            <Button
              buttonText="New To-Do"
              handleClick={() => layoutContext.doShowTaskModal()}
            />
            <div
              // ref={infoRef}
              className={
                "absolute bottom-0 left-0 right-0 w-fit -z-10 w-sm bg-gray-50 text-xs border px-2 mx-auto border-gray-400 rounded-full transition-all duration-1000" +
                (tasksContext.filters.length ? " opacity-100" : " opacity-0")
              }
            >
              Filters are active
            </div>
          </div>
          <Table />
        </div>
        <div className="mt-4 md:w-5/6 lg:max-w-3xl mx-auto flex justify-center">
          <PageNav />
        </div>
        {layoutContext.showTaskModal && <TaskModal />}
        {layoutContext.showInfoModal && <InfoModal title="OOPS!" message="It seems you already have a To-Do with that name. Try with a different name"/>}
      </Layout>
    </div>
  );
}

export default App;
