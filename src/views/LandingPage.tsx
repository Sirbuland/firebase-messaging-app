import { getToken, onMessage } from "firebase/messaging";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import NotificationButton from "../components/NotificationButton";
import { VAPID_KEY } from "../services/firebaseConfig";
import { messaging } from "../services/fcm";

function LandingPage() {
  const [fcmToken, setFcmToken] = useState("");

  async function requestPermission() {
    //requesting permission using Notification API
    const permission = await Notification.requestPermission();

    if (permission === "granted") {
      const token = await getToken(messaging, {
        vapidKey: VAPID_KEY,
      });

      setFcmToken(token);
    } else if (permission === "denied") {
      //notifications are blocked
      alert("Permission is required for the notifications feature to work");
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onMessage(messaging, (payload) => {
    toast(payload?.data?.text);
  });

  useEffect(() => {
    requestPermission();
  }, []);

  return (
    <>
      <h1>Firebase Notifications</h1>
      <div className="card">
        <NotificationButton fcmToken={fcmToken} color="success">
          Success Notification
        </NotificationButton>
        <NotificationButton fcmToken={fcmToken} color="primary">
          Event Notification
        </NotificationButton>
        <NotificationButton fcmToken={fcmToken} color="error">
          Error Notification
        </NotificationButton>
        <ToastContainer />
      </div>
    </>
  );
}

export default LandingPage;
