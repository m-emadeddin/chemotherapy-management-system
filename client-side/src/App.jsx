import React from "react";
import Routes from "./Routes";
import { BrowserRouter as Router } from "react-router-dom";
import { RegimenDetailsProvider } from "./contexts/RegimenDetailsContext ";
import { AuthProvider } from "./contexts/AuthContext";

function App() {
  return (
    <AuthProvider>
      <RegimenDetailsProvider>
        <Router>
          <Routes />
        </Router>
      </RegimenDetailsProvider>
    </AuthProvider>
  );
}

export default App;
