import "./App.css";
import Layout from "./components/Layout";
import Filters from "./components/Filters";
import Table from "./components/Table";
import Button from "./components/shared/Button";
import PageNav from "./components/PageNav";
import TasksProvider from "./store/TasksProvider";

import { TEST_DATA } from "./mock/mock-data.js";
import { useContext } from "react";
import ThemeContext from "./store/theme-context";

function App() {
    const ctx = useContext(ThemeContext)
    return (
        <div className={"App" + (ctx.dark ? " dark " : " ") + "min-h-screen"}>
            {/* <div className="dark:bg-black">hola</div> */}
            <Layout toggleThemeEvent={ctx.handleToggleTheme}>
                <TasksProvider>
                    <div className="md:w-5/6 lg:max-w-3xl mx-auto">
                        <Filters></Filters>
                    </div>
                    <div className="md:w-5/6 lg:max-w-3xl mx-auto">
                        <div className="my-4">
                            <Button buttonText="New To Do"></Button>
                        </div>
                        <Table tasks={[]}></Table>
                    </div>
                    <div className="mt-4 md:w-5/6 lg:max-w-3xl mx-auto flex justify-center">
                        <PageNav></PageNav>
                    </div>
                </TasksProvider>
            </Layout>
        </div>
    );
}

export default App;
