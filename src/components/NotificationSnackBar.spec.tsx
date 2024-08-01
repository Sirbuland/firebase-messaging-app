// src/components/NotificationSnackBar.test.tsx
import React from "react";
import { render, screen } from "@testing-library/react";
import NotificationSnackBar from "./NotificationSnackBar"; // Adjust the path if necessary
import { Notification } from "../types/Notification";
import { subscribeToNotifications } from "../services/firestore";

vi.mock("../services/firestore", () => ({
  subscribeToNotifications: vi.fn(),
  markAsRead: vi.fn(),
}));

const mockNotifications: Notification[] = [
  {
    id: "1",
    message: "Test Notification 1",
    read: false,
    type: "event",
  },
  {
    id: "2",
    message: "Test Notification 2",
    read: false,
    type: "error",
  },
];

describe("NotificationSnackBar", () => {
  beforeEach(() => {
    (subscribeToNotifications as vi.Mock).mockImplementation((callback) => {
      callback(mockNotifications);
      return vi.fn();
    });
  });

  it("renders notifications", async () => {
    render(<NotificationSnackBar />);

    for (const notification of mockNotifications) {
      expect(screen.getByText(notification.message)).toBeInTheDocument();
    }
  });
});
