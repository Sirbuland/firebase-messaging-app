import { ReactNode } from "react";
import Button from "@mui/material/Button";
import { v7 as uuidv7 } from "uuid";

import { addUserNotification } from "../services/firestore";
import { NotificationType } from "../types/Notification";

type ColorPropOptions = "primary" | "secondary" | "error" | "success";

type NotificationButtonProps = {
  color: ColorPropOptions;
  children: ReactNode;
  type: NotificationType;
};

export default function NotificationButton({
  color,
  children,
  type,
}: NotificationButtonProps) {
  const createNotification = async () => {
    addUserNotification({
      message: children?.toString() || "",
      type,
      id: uuidv7(),
      read: false,
    });
  };

  return (
    <Button
      sx={{ m: 2 }}
      variant="contained"
      color={color}
      onClick={createNotification}
    >
      {children}
    </Button>
  );
}
