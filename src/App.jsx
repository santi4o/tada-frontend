import "./App.css";
import Layout from "./components/Layout";
import Filters from "./components/Filters";
import Table from "./components/Table";
import Button from "./components/shared/Button";
import PageNav from "./components/PageNav";
import TasksProvider from "./store/TasksProvider";
import TaskModal from "./components/TaskModal";
import { useContext } from "react";
import LayoutContext from "./store/layout-context";

function App() {
  const layoutContext = useContext(LayoutContext);

  return (
    <div className={"App" + (layoutContext.dark ? " dark " : " ")}>
      {/* <div className="dark:bg-black">hola</div> */}
      <TasksProvider>
        <Layout>
          <div className="md:w-5/6 lg:max-w-3xl mx-auto">
            <Filters />
          </div>
          <div className="md:w-5/6 lg:max-w-3xl mx-auto">
            <div className="my-4">
              <Button
                buttonText="New To-Do"
                handleClick={() => layoutContext.doShowTaskModal()}
              />
            </div>
            <Table />
          </div>
          <div className="mt-4 md:w-5/6 lg:max-w-3xl mx-auto flex justify-center">
            <PageNav />
          </div>
          {layoutContext.showTaskModal && <TaskModal />}
        </Layout>
      </TasksProvider>
    </div>
  );
}

export default App;
