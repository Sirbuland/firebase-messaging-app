export type Notification = {
  id: string;
  message: string;
  type: NotificationType;
  read: boolean;
};

export type NotificationType = "event" | "error" | "success";
