const { createContext, useState, useContext } = require("react");

const SelectedPatientInfoContext = createContext()

export const SelectedPatientInfoProvider = ({ children }) => {
    const [selectedPatientInfo, setSelectedPatientInfo] = useState(null);

    return (
        <SelectedPatientInfoContext.Provider value={{ selectedPatientInfo, setSelectedPatientInfo }}>
            {children}
        </SelectedPatientInfoContext.Provider>);
}

export const useSelectedPatientInfo = () => useContext(SelectedPatientInfoContext);