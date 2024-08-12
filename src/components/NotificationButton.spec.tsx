import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import NotificationButton from "./NotificationButton";
import { sendNotification } from "../services/notifications";
import { vi } from "vitest";

vi.mock("../services/notifications", () => ({
  sendNotification: vi.fn(),
}));

describe("NotificationButton", () => {
  const mockAddUserNotification = sendNotification as vi.Mock;

  it("renders the button with correct text", () => {
    render(
      <NotificationButton color="primary" fcmToken="testToken">
        Test Notification
      </NotificationButton>
    );

    expect(screen.getByText("Test Notification")).toBeInTheDocument();
  });

  it("calls sendNotification with correct parameters on click", async () => {
    render(
      <NotificationButton color="primary" fcmToken="testToken">
        Test Notification
      </NotificationButton>
    );

    const button = screen.getByText("Test Notification");
    await userEvent.click(button);

    expect(mockAddUserNotification).toHaveBeenCalledTimes(1);
    expect(mockAddUserNotification).toHaveBeenCalledWith(
      expect.objectContaining({
        message: "Test Notification",
        fcm_token: "testToken",
      })
    );
  });

  it("uses the correct color prop", () => {
    render(
      <NotificationButton color="success" fcmToken="testToken">
        Success Notification
      </NotificationButton>
    );

    const button = screen.getByText("Success Notification");
    expect(button).toHaveClass("MuiButton-containedSuccess");
  });
});
