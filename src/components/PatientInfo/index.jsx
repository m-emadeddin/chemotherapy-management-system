import React from "react";
import { Button, Img } from "components";
import "./patientinfo.css";

export default function PatientRecord({ patients }) {
  return (
    <table className="patient-record">
      <thead>
        <tr className="info-tablehead">
          <th>Patient</th>
          <th>ID</th>
          <th>Gender</th>
          <th>Disease Type</th>
          <th>Phone Number</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {patients.map((patient) => (
          <>
            <tr key={patient.id} className="info-data-container">
              <td>
                {patient.patient.name}
                <br />
                <span className="age">{patient.patient.age} years old</span>
              </td>
              <td>{patient.id}</td>
              <td>{patient.gender}</td>
              <td>{patient.diseaseType}</td>
              <td>{patient.phoneNumber}</td>
              <td>
                <Button size="md" shape="circle" className="action-button">
                  <Img src="images/img_thumbs_up.svg" />
                </Button>
                <Button size="md" shape="circle" className="action-button">
                  <Img src="images/img_map.svg" />
                </Button>
              </td>
            </tr>
            <tr class="separator" />
          </>
        ))}
      </tbody>
    </table>
  );
}
