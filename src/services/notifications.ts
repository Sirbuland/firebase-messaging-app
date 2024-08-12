import axios from "axios";

const API_URL = import.meta.env.REACT_APP_API_URL;

export const sendNotification = (data: {
  fcm_token: string;
  message: string;
}) => {
  axios.post(`${API_URL}/notifySelf`, data);
};
