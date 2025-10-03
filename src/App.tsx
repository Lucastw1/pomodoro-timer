import React from "react";
import "./App.css";
import Timer from "./components/Timer/Timer";

function App() {
  return (
    <>
      <div className="App">
        <header className="App-header">
          <h1>Pomodoro Timer</h1>
        </header>
        <h2>Manage your time effectively with the Pomodoro Technique</h2>
      </div>
      <div style={{ height: "20px" }}>
        <Timer />
      </div>
    </>
  );
}

export default App;
