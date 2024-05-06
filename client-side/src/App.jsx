import React from "react";
import Routes from "./Routes";
import { BrowserRouter as Router } from "react-router-dom";
import { RegimenDetailsProvider } from "./contexts/RegimenDetailsContext ";

function App() {
  return (
    <RegimenDetailsProvider>
      <Router>
        <Routes />
      </Router>
    </RegimenDetailsProvider>
  );
}

export default App;
