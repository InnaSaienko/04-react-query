import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import App from "./App";

describe("App", () => {
  it("shows Notification initially", () => {
    render(<App />);

    expect(screen.getByText(/no feedback/i)).toBeInTheDocument();
  });

  it("updates statistics after voting", async () => {
    const user = userEvent.setup();

    render(<App />);

    await user.click(screen.getByRole("button", { name: /good/i }));

    expect(screen.getByText(/good:/i)).toHaveTextContent("1");
    expect(screen.getByText(/total:/i)).toHaveTextContent("1");
    expect(screen.getByText(/positive:/i)).toHaveTextContent("100%");
  });

  it("resets all votes", async () => {
    const user = userEvent.setup();

    render(<App />);

    await user.click(screen.getByRole("button", { name: /good/i }));
    await user.click(screen.getByRole("button", { name: /reset/i }));

    expect(screen.getByText(/no feedback/i)).toBeInTheDocument();
  });
});