import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import NotificationButton from "./NotificationButton";
import { addUserNotification } from "../services/firestore";
import { vi } from "vitest";

vi.mock("../services/firestore", () => ({
  addUserNotification: vi.fn(),
}));

describe("NotificationButton", () => {
  const mockAddUserNotification = addUserNotification as vi.Mock;

  it("renders the button with correct text", () => {
    render(
      <NotificationButton color="primary" type="error">
        Test Notification
      </NotificationButton>
    );

    expect(screen.getByText("Test Notification")).toBeInTheDocument();
  });

  it("calls addUserNotification with correct parameters on click", async () => {
    render(
      <NotificationButton color="primary" type="error">
        Test Notification
      </NotificationButton>
    );

    const button = screen.getByText("Test Notification");
    await userEvent.click(button);

    expect(mockAddUserNotification).toHaveBeenCalledTimes(1);
    expect(mockAddUserNotification).toHaveBeenCalledWith(
      expect.objectContaining({
        message: "Test Notification",
        type: "error",
        read: false,
      })
    );
  });

  it("uses the correct color prop", () => {
    render(
      <NotificationButton color="success" type="error">
        Success Notification
      </NotificationButton>
    );

    const button = screen.getByText("Success Notification");
    expect(button).toHaveClass("MuiButton-containedSuccess");
  });
});
