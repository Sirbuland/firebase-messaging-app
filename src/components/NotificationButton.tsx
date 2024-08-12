import { ReactNode } from "react";
import Button from "@mui/material/Button";

import { sendNotification } from "../services/notifications";
export type ColorPropOptions = "primary" | "secondary" | "error" | "success";

type NotificationButtonProps = {
  color: ColorPropOptions;
  children: ReactNode;
  fcmToken: string;
};

export default function NotificationButton({
  color,
  children,
  fcmToken,
}: NotificationButtonProps) {
  const createNotification = async () => {
    try {
      sendNotification({
        fcm_token: fcmToken,
        message: children?.toString() || "",
      });
    } catch (err) {
      console.log(err);
    }
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
