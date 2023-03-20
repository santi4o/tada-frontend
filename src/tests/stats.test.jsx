import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Stats from "../components/Stats";
import TasksContext from "../store/tasks-context";

describe("Statistics footer", () => {
  test("renders tasks", () => {
    const tasksContext = {
      list: [],
      page: 0,
      totalPages: 1,
      sorting: [],
      filters: [],
      statistics: [
        {
          id: 4,
          name: "avg high",
          description:
            "Average time to finish a high priority to-do in seconds",
          value: 3811.0,
        },
        {
          id: 3,
          name: "avg med",
          description:
            "Average time to finish a medium priority to-do in seconds",
          value: 30.0,
        },
        {
          id: 2,
          name: "avg low",
          description: "Average time to finish a low priority to-do in seconds",
          value: 24.0,
        },
        {
          id: 1,
          name: "avg general",
          description: "Average time to finish a to-do in seconds",
          value: 1919.0,
        },
      ],
    };
    render(
      <TasksContext.Provider value={tasksContext}>
        <Stats />
      </TasksContext.Provider>
    );

    // const { queryByText } = render(<Table/>);
    // expect(queryByText("Name")).toBeTruthy();

    const avgTime = screen.queryByText("31 minutes, 59 seconds");
    expect(avgTime).not.toBeNull();
    const lowAvgTime = screen.queryByText("Low: 24 seconds");
    expect(lowAvgTime).not.toBeNull();
    const medAvgTime = screen.queryByText("Medium: 30 seconds");
    expect(medAvgTime).not.toBeNull();
    const highAvgTime = screen.queryByText("High: 1 hours, 3 minutes, 31 seconds");
    expect(highAvgTime).not.toBeNull();
  });
});
