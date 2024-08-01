import "./App.css";

import NotificationButton from "./components/NotificationButton";

function App() {
  return (
    <>
      <div className="card">
        <NotificationButton color="success">Success Notify</NotificationButton>
        <NotificationButton color="primary">Event Notify</NotificationButton>
        <NotificationButton color="error">Error Notify</NotificationButton>
      </div>
    </>
  );
}

export default App;
