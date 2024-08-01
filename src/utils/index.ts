import { v7 as uuidv7 } from "uuid";

export const getUserId = () => {
  let userId = localStorage.getItem("userId");
  if (!userId) {
    userId = uuidv7();

    localStorage.setItem("userId", userId);
  }

  return userId;
};
