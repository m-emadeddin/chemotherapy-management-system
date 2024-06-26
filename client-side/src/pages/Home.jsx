import React from "react";
import { Link } from "react-router-dom";
const Home = () => {
  return (
    <div
      style={{
        height: "100vh",
        padding: "20px",
        backgroundColor: "#232323",
        color: "white",
      }}
    >
      <h1 style={{ fontSize: "48px", marginBottom: "20px" }}>Homepage</h1>
      <p style={{ fontSize: "18px", marginBottom: "30px" }}>
        This project is developed By{" "}
        <a
          href="https://github.com/m-emadeddin/chemotherapy-management-system"
          style={{ color: "#87CEFA", textDecoration: "none" }}
        >
          Codeless Team
        </a>
        . Chemotherapy Management System CMS .
      </p>
      <ul style={{ listStyle: "none", padding: "0", marginTop: "100px" }}>
        <li style={{ marginBottom: "10px" }}>
          <Link
            to="/dashboard"
            style={{ color: "#87CEFA", textDecoration: "none" }}
          >
            Dashboard
          </Link>
        </li>
        <li style={{ marginBottom: "10px" }}>
          <Link
            to="/login"
            style={{ color: "#87CEFA", textDecoration: "none" }}
          >
            Loginpage
          </Link>
        </li>
        <li style={{ marginBottom: "10px" }}>
          <Link
            to="/dashboard"
            style={{ color: "#87CEFA", textDecoration: "none" }}
          >
            SelectPatient
          </Link>
        </li>
        <li style={{ marginBottom: "10px" }}>
          <Link
            to="/patient"
            style={{ color: "#87CEFA", textDecoration: "none" }}
          >
            Patient
          </Link>
        </li>
        <li style={{ marginBottom: "10px" }}>
          <Link
            to="/order"
            style={{ color: "#87CEFA", textDecoration: "none" }}
          >
            Orderchemotherapy
          </Link>
        </li>
        <li style={{ marginBottom: "10px" }}>
          <Link
            to="/review-order"
            style={{ color: "#87CEFA", textDecoration: "none" }}
          >
            Reviewchemotherapyorder
          </Link>
        </li>
        <li style={{ marginBottom: "10px" }}>
          <Link
            to="/document"
            style={{ color: "#87CEFA", textDecoration: "none" }}
          >
            Documentchemotherapy
          </Link>
        </li>
      </ul>
    </div>
  );
};
export default Home;
