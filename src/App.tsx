import React, { useEffect, useState } from "react";

import "./App.css";
import ActivityLogging from "./modules/activityLogging/component/activityLogging";

interface IState {
  authCode: string;
}

const App: React.FC = () => {
  const [authCode, setAuthCode] = useState("");
  useEffect(() => {
    const url = window.location.href;
  }, [authCode]);
  return (
    <div className="App">
      <header className="App-header">
        <ActivityLogging />
      </header>
    </div>
  );
};

export default App;
