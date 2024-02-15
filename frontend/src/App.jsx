import React from "react";
import { FiSettings } from "react-icons/fi";

import { AppRouter } from "./routes/AppRouter";
import { ThemeSettingsComponent } from "./components";
import { useStateContext } from "./contexts/ContextProvider";

import "./App.css";


function App() {
  const { currentColor, themeSettings, setThemeSettings } = useStateContext();

  return (
    <>
      <div className="fixed right-4 bottom-4" style={{ zIndex: "1000" }}>
        <button
          type="button"
          className="text-3xl p-3 hover:drop-shadow-xl hover:bg-light-gray text-white"
          style={{ background: currentColor, borderRadius: "25%" }}
          onClick={() => setThemeSettings(true)}
        >
          {<FiSettings />}
        </button>
      </div>
      <AppRouter />
      {themeSettings && <ThemeSettingsComponent />}
    </>
  );
}

export default App;
