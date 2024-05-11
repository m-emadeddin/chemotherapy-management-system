import React from "react";
import Routes from "./Routes";
import { BrowserRouter as Router } from "react-router-dom";
import { RegimenDetailsProvider } from "./contexts/RegimenDetailsContext ";
import { AuthProvider } from "./contexts/AuthContext";
import { PlansDetailsProvider } from "contexts/PlansDetails";
import { PlanDataProvider } from "contexts/PlanDataContext";

function App() {
  return (
    <AuthProvider>
      <PlansDetailsProvider>
        <PlanDataProvider>
          <RegimenDetailsProvider>
            <Router>
              <Routes />
            </Router>
          </RegimenDetailsProvider>
        </PlanDataProvider>
      </PlansDetailsProvider>
    </AuthProvider>
  );
}

export default App;
