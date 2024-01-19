import React from "react";
import MainPage from "./pages/MainPage";
import { useSelector } from "react-redux";
import AppFloatingPanel from "./components/AppFloatingPanel";

function App() {
  const isPanelVisible = useSelector(state => state.app.isPanelVisible);

  return (
    <div className="App">
      <MainPage />
      {isPanelVisible && <AppFloatingPanel />}
    </div>
  );
}

export default App;
