import { ReactNode } from "react";
import Button from "@mui/material/Button";

export type ColorPropOptions = "primary" | "secondary" | "error" | "success";

type NotificationButtonProps = {
  color: ColorPropOptions;
  children: ReactNode;
};

export default function NotificationButton({
  color,
  children,
}: NotificationButtonProps) {
  return (
    <Button sx={{ m: 2 }} variant="contained" color={color} onClick={() => {}}>
      {children}
    </Button>
  );
}
