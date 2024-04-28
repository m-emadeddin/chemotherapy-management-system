import React from "react";
import { useRoutes } from "react-router-dom";
import Home from "pages/Home";
import NotFound from "pages/NotFound";
import Loginpage from "pages/Loginpage";
import SelectPatient from "pages/SelectPatient";
import SelectedPatient from "pages/SelectedPatient";
import Patient from "pages/Patient";
import Document from "pages/Document";
import Orderchemotherapy from "pages/Orderchemotherapy";
import OrderchemotherapyTwo from "pages/OrderchemotherapyTwo";
import Reviewchemotherapyorder from "pages/Reviewchemotherapyorder";
import Documentchemotherapy from "pages/Documentchemotherapy";

const ProjectRoutes = () => {
  let element = useRoutes([
    { path: "/", element: <Home /> },
    { path: "*", element: <NotFound /> },
    {
      path: "login",
      element: <Loginpage />,
    },
    {
      path: "selectpatient",
      element: <SelectPatient />,
    },
    {
      path: "selectedpatient",
      element: <SelectedPatient />,
    },
    {
      path: "patient",
      element: <Patient />,
    },
    {
      path: "orderchemotherapy",
      element: <Orderchemotherapy />,
    },
    {
      path: "orderchemotherapytwo",
      element: <OrderchemotherapyTwo />,
    },
    {
      path: "reviewchemotherapyorder",
      element: <Reviewchemotherapyorder />,
    },
    {
      path: "documentchemotherapy",
      element: <Documentchemotherapy />,
    },
    {
      path: "document",
      element: <Document />,
    },
  ]);

  return element;
};

export default ProjectRoutes;
