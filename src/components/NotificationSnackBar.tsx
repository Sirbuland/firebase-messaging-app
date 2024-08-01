import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import { SyntheticEvent, useEffect, useState } from "react";
import { markAsRead, subscribeToNotifications } from "../services/firestore";
import { Notification } from "../types/Notification";

export default function NotificationSnackbar() {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    const unsubscribe = subscribeToNotifications((notifications) => {
      setNotifications(notifications);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  const handleClose = (
    event: SyntheticEvent | Event,
    notificationId: string,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    markAsRead(notificationId);

    const updateIndex = notifications.findIndex(
      (notification) => notification.id === notificationId
    );

    if (updateIndex !== -1) {
      const updatedNotificationsArray = [...notifications];
      updatedNotificationsArray[updateIndex].read = true;
      setNotifications(updatedNotificationsArray);
    }
  };

  const action = (notificationId: string) => (
    <>
      <Button
        color="secondary"
        size="small"
        onClick={(event) => handleClose(event, notificationId)}
      >
        Mark as Read
      </Button>
    </>
  );

  return (
    <div>
      {notifications.map((notification) => (
        <Snackbar
          key={notification.id}
          open={!notification.read}
          autoHideDuration={6000}
          onClose={(event, reason) =>
            handleClose(event, notification.id, reason)
          }
          message={notification.message}
          action={action(notification.id)}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          ContentProps={{
            sx: {
              backgroundColor: "rgb(28 31 101)",
            },
          }}
        />
      ))}
    </div>
  );
}
