import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import TaskForm from "../components/TaskForm";
import TasksContext from "../store/tasks-context";
import LayoutContext from "../store/layout-context";

describe("Task form", () => {
  test("has empty fields when creating a to-do", () => {
    const tasksContext = {
      list: [],
      page: 0,
      totalPages: 1,
      sorting: [],
      filters: [],
      statistics: [],
    };

    const layoutContext = {
      dark: false,
      showTaskModal: true,
      updatingTask: null,
    };

    render(
      <LayoutContext.Provider value={layoutContext}>
        <TasksContext.Provider value={tasksContext}>
          <TaskForm />
        </TasksContext.Provider>
      </LayoutContext.Provider>
    );

    // const { queryByText } = render(<Table/>);
    // expect(queryByText("Name")).toBeTruthy();

    const nameInput = screen.getByPlaceholderText("A magic To-Do 🌟");
    expect(nameInput.value).toBe("");
    const dateInput = screen.getByPlaceholderText("Optional");
    expect(dateInput.value).toBe("");
  });

  test("has pre-loaded fields when updating a to-do", () => {
    const tasksContext = {
      list: [],
      page: 0,
      totalPages: 1,
      sorting: [],
      filters: [],
      statistics: [],
    };

    const layoutContext = {
      dark: false,
      showTaskModal: true,
      updatingTask: {
        id: 1,
        text: "test task",
        priority: 2,
        creationDate: "2023-03-20T21:29:41.996+0000",
        dueDate: "2023-03-31T12:00:00.000+0000",
        done: false,
        doneDate: null,
      },
    };

    render(
      <LayoutContext.Provider value={layoutContext}>
        <TasksContext.Provider value={tasksContext}>
          <TaskForm />
        </TasksContext.Provider>
      </LayoutContext.Provider>
    );

    // const { queryByText } = render(<Table/>);
    // expect(queryByText("Name")).toBeTruthy();

    const nameInput = screen.getByPlaceholderText("A magic To-Do 🌟");
    expect(nameInput.value).toBe("test task");
    const dateInput = screen.getByPlaceholderText("Optional");
    expect(dateInput.value).toBe("2023/03/31");
  });
});
