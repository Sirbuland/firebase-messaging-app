import "./App.css";

import NotificationButton from "./components/NotificationButton";
import NotificationSnackbar from "./components/NotificationSnackBar";

function App() {
  return (
    <>
      <div className="card">
        <NotificationButton color="success">Success Notify</NotificationButton>
        <NotificationButton color="primary">Event Notify</NotificationButton>
        <NotificationButton color="error">Error Notify</NotificationButton>
        <NotificationSnackbar></NotificationSnackbar>
      </div>
    </>
  );
}

export default App;
