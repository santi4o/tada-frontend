import "./App.css";
import Layout from "./components/Layout";
import Filters from "./components/Filters";
import Table from "./components/Table";
import Button from "./components/shared/Button";
import PageNav from "./components/PageNav";
import { useEffect, useState } from "react";

function App() {
    const [darkTheme, setDarkTheme] = useState(false);

    useEffect(() => {
        if (
            localStorage.getItem("color-theme") === "dark" ||
            (!("color-theme" in localStorage) &&
                window.matchMedia("(prefers-color-scheme: dark)").matches)
        ) {
            setDarkTheme(true);
        } else {
            setDarkTheme(false);
        }
    }, []);

    function handleToggleTheme() {
        if (darkTheme) {
            localStorage.setItem("color-theme", "light");
            setDarkTheme(false);
        } else {
            localStorage.setItem("color-theme", "dark");
            setDarkTheme(true);
        }
    }

    if (darkTheme) {
        document.body.style.backgroundColor = "black";
    } else {
        document.body.style.backgroundColor = "white";
    }
    return (
        <div className={"App" + (darkTheme ? " dark " : " ") + "min-h-screen"}>
            {/* <div className="dark:bg-black">hola</div> */}
            <Layout toggleThemeEvent={handleToggleTheme}>
                <div className="md:w-5/6 lg:max-w-3xl mx-auto">
                    <Filters></Filters>
                </div>
                <div className="md:w-5/6 lg:max-w-3xl mx-auto">
                    <div className="my-4">
                        <Button buttonText="New To Do"></Button>
                    </div>
                    <Table></Table>
                </div>
                <div className="mt-4 md:w-5/6 lg:max-w-3xl mx-auto flex justify-center">
                    <PageNav ></PageNav>
                </div>
            </Layout>
        </div>
    );
}

export default App;
