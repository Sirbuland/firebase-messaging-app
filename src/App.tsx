import { useState } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          Button 1 {count}
        </button>
        <button onClick={() => setCount((count) => count + 1)}>
          Button 2 {count}
        </button>
        <button onClick={() => setCount((count) => count + 1)}>
          Button 3 {count}
        </button>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
