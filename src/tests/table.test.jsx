import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Table from "../components/Table";
import TasksContext from "../store/tasks-context";

describe("To-dos table", () => {
  test("renders tasks", () => {
    const tasksContext = {
      list: [
        {
          id: 1,
          text: "test task",
          priority: 2,
          creationDate: "2023-03-20T21:29:41.996+0000",
          dueDate: "2023-03-31T12:00:00.000+0000",
          done: false,
          doneDate: null,
        },
      ],
      page: 0,
      totalPages: 1,
      sorting: [],
      filters: [],
      statistics: [],
    };
    render(
      <TasksContext.Provider value={tasksContext}>
        <Table />
      </TasksContext.Provider>
    );

    // const { queryByText } = render(<Table/>);
    // expect(queryByText("Name")).toBeTruthy();

    const taskName = screen.queryByText("test task");
    expect(taskName).not.toBeNull();
    const taskPriority = screen.queryByText("High");
    expect(taskPriority).not.toBeNull();
    const taskDueDate = screen.queryByText("2023/03/31");
    expect(taskDueDate).not.toBeNull();
  });
});
