import React from "react";
import { useRoutes } from "react-router-dom";
import Home from "pages/Home";
import NotFound from "pages/NotFound";
import Loginpage from "pages/Loginpage";
import SelectPatient from "pages/SelectPatient";
import Patient from "pages/Patient";
import Orderchemotherapy from "pages/Orderchemotherapy";
import Reviewchemotherapyorder from "pages/Reviewchemotherapyorder";
import Documentchemotherapy from "pages/Documentchemotherapy";
import AppLayout from "components/AppLayout";
import AlreadyLoggedIn from "contexts/AlreadyLoggedIn";
import RequireAuth from "contexts/RequireAuth";

const ProjectRoutes = () => {
  let element = useRoutes([
    { path: "/", element: <Home /> },
    { path: "*", element: <NotFound /> },
    {
      path: "login",
      element: (
        <AlreadyLoggedIn>
          <Loginpage />
        </AlreadyLoggedIn>
      ),
    },
    {
      element: (
        <RequireAuth>
          <AppLayout />
        </RequireAuth>
      ),
      children: [
        {
          path: "select_patient",
          element: <SelectPatient />,
        },
        {
          path: "patient/:id",
          element: <Patient />,
        },
        {
          path: "order",
          element: <Orderchemotherapy />,
        },
        {
          path: "order/review-order",
          element: <Reviewchemotherapyorder />,
        },

        {
          path: "document",
          element: <Documentchemotherapy />,
        },
        {
          path: "document/order",
          element: <Orderchemotherapy />,
        },
      ],
    },
  ]);

  return element;
};

export default ProjectRoutes;
