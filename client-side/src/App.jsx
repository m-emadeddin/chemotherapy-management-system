import React from "react";
import Routes from "./Routes";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";

function App() {
  return (

    <Router>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </Router>
    
  );
}

export default App;
