import React, { createContext, useContext, useEffect, useState } from "react";

const PatientsInfoContext = createContext();

export const PatientsInfoProvider = ({ children }) => {
    const [patientsInfo, setPatientsInfo] = useState(() => {
        return JSON.parse(localStorage.getItem("patientsInfo")) || null;
    });

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

    useEffect(() => {
        if (!patientsInfo) {
            fetchPatientsInfo();
        }
    }, [patientsInfo]);

    const deletePatient = async (patientId) => {
        try {
            const response = await fetch(`/patients/delete-patient/${patientId}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Failed to delete patient');
            }
            // After successful deletion, fetch updated patient info
            fetchPatientsInfo();
        } catch (error) {
            console.error(error);
        }
    };

    const patientsInfoValies = {
        patientsInfo,
        deletePatient,
    }

    return (
        <PatientsInfoContext.Provider value={patientsInfoValies}>
            {patientsInfo !== null ? children : null}
        </PatientsInfoContext.Provider>
    );
}

export const usePatientsInfo = () => useContext(PatientsInfoContext);
