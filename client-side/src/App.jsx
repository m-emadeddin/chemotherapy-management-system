import React from "react";
import Routes from "./Routes";
import { BrowserRouter as Router } from "react-router-dom";
import { RegimenDetailsProvider } from "./contexts/RegimenDetailsContext ";
import { AuthProvider } from "./contexts/AuthContext";
import { PlansDetailsProvider } from "contexts/PlansDetails";
import { PlanDataProvider } from "contexts/PlanDataContext";
import { PatientsInfoProvider } from "contexts/PatientsInfoContext";
import { CycleProvider } from "contexts/Cycle";
import { SelectedPatientProvider } from "./contexts/SelectedPatientProvider";
import { SelectedPatientInfoProvider } from "contexts/SelectedPatientInfoDetails";

function App() {
  return (
    <AuthProvider>
      <PatientsInfoProvider>
        <SelectedPatientInfoProvider>
          <SelectedPatientProvider>
            <PlansDetailsProvider>
              <PlanDataProvider>
                <RegimenDetailsProvider>
                  <CycleProvider>
                    <Router>
                      <Routes />
                    </Router>
                  </CycleProvider>
                </RegimenDetailsProvider>
              </PlanDataProvider>
            </PlansDetailsProvider>
          </SelectedPatientProvider>
        </SelectedPatientInfoProvider>
      </PatientsInfoProvider>
    </AuthProvider>
  );
}

export default App;
