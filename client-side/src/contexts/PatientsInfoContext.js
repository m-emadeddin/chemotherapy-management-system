import React, { createContext, useContext, useEffect, useState } from "react";

const PatientsInfoContext = createContext();

export const PatientsInfoProvider = ({ children }) => {
    const [patientsInfo, setPatientsInfo] = useState(() => {
        return JSON.parse(localStorage.getItem("patientsInfo")) || null;
    });

    useEffect(() => {
        const fetchPatientsInfo = async () => {
            try {
                const response = await fetch('/patients/all-patients');
                if (!response.ok) {
                    throw new Error('Failed to fetch patient details');
                }
                const data = await response.json();
                setPatientsInfo(data);
                localStorage.setItem('patientsInfo', JSON.stringify(data));
            } catch (error) {
                console.error(error);
            }
        };

        if (!patientsInfo) {
            fetchPatientsInfo();
        }
    }, [patientsInfo]);

    return (
        <PatientsInfoContext.Provider value={patientsInfo}>
            {patientsInfo !== null ? children : null}
        </PatientsInfoContext.Provider>
    );
}

export const usePatientsInfo = () => useContext(PatientsInfoContext);
