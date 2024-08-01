import NotificationButton from "../components/NotificationButton";
import NotificationSnackbar from "../components/NotificationSnackBar";

function LandingPage() {
  return (
    <>
      <h1>Firebase Notifications</h1>
      <div className="card">
        <NotificationButton color="success">
          Success Notification
        </NotificationButton>
        <NotificationButton color="primary">
          Event Notification
        </NotificationButton>
        <NotificationButton color="error">
          Error Notification
        </NotificationButton>
        <NotificationSnackbar></NotificationSnackbar>
      </div>
    </>
  );
}

export default LandingPage;
