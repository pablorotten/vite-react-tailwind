import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import ButtonGroup from "./ButtonGroup";

describe("ButtonGroup", () => {
  it("renders options and highlights the selected one", () => {
    render(
      <ButtonGroup value="react" onChange={vi.fn()}>
        <ButtonGroup.Option value="react">React</ButtonGroup.Option>
        <ButtonGroup.Option value="vue">Vue</ButtonGroup.Option>
      </ButtonGroup>,
    );

    expect(screen.getByRole("button", { name: "React" })).toHaveClass(
      "bg-indigo-600",
    );
    expect(screen.getByRole("button", { name: "Vue" })).toHaveClass(
      "bg-white",
    );
  });

  it("calls onChange with the clicked option value", async () => {
    const handleChange = vi.fn();
    const user = userEvent.setup();

    render(
      <ButtonGroup value="react" onChange={handleChange}>
        <ButtonGroup.Option value="react">React</ButtonGroup.Option>
        <ButtonGroup.Option value="vue">Vue</ButtonGroup.Option>
      </ButtonGroup>,
    );

    await user.click(screen.getByRole("button", { name: "Vue" }));

    expect(handleChange).toHaveBeenCalledWith("vue");
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it("throws if an option is rendered outside the group", () => {
    const consoleError = vi
      .spyOn(console, "error")
      .mockImplementation(() => undefined);

    expect(() => {
      render(<ButtonGroup.Option value="react">React</ButtonGroup.Option>);
    }).toThrow("ButtonGroup.Option must be used inside <ButtonGroup>");

    consoleError.mockRestore();
  });
});