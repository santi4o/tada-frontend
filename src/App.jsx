import "./App.css";
import Layout from "./components/Layout";
import Filters from "./components/Filters";
import Table from "./components/Table";
import Button from "./components/shared/Button";
import PageNav from "./components/PageNav";
import TasksProvider from "./store/TasksProvider";
import NewTaskModal from "./components/NewTaskModal";
import { useContext } from "react";
import LayoutContext from "./store/layout-context";

function App() {
  const layoutContext = useContext(LayoutContext);

  return (
    <div className={"App" + (layoutContext.dark ? " dark " : " ")}>
      {/* <div className="dark:bg-black">hola</div> */}
      <Layout>
        <TasksProvider>
          <div className="md:w-5/6 lg:max-w-3xl mx-auto">
            <Filters />
          </div>
          <div className="md:w-5/6 lg:max-w-3xl mx-auto">
            <div className="my-4">
              <Button
                buttonText="New To-Do"
                handleClick={() => layoutContext.setShowNewTaskModal(true)}
              />
            </div>
            <Table />
          </div>
          <div className="mt-4 md:w-5/6 lg:max-w-3xl mx-auto flex justify-center">
            <PageNav />
          </div>
          {layoutContext.showNewTaskModal && <NewTaskModal />}
        </TasksProvider>
      </Layout>
    </div>
  );
}

export default App;
