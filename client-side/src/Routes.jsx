import React from "react";
import { useRoutes } from "react-router-dom";
import NotFound from "pages/NotFound";
import Loginpage from "pages/Loginpage";
import Patient from "pages/Patient";
import Orderchemotherapy from "pages/Orderchemotherapy";
import Reviewchemotherapyorder from "pages/Reviewchemotherapyorder";
import Documentchemotherapy from "pages/Documentchemotherapy";
import AppLayout from "components/AppLayout";
import AlreadyLoggedIn from "contexts/AlreadyLoggedIn";
import RequireAuth from "contexts/RequireAuth";
import { TokenValidityProvider } from "./contexts/TokenValidityContext";
import Dashboard from "pages/Dashboard";

const ProjectRoutes = () => {
  const element = useRoutes([
    {
      path: "/",
      element: (
        <AlreadyLoggedIn>
          <Loginpage />
        </AlreadyLoggedIn>
      ),
    },
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
          <TokenValidityProvider>
            <AppLayout />
          </TokenValidityProvider>
        </RequireAuth>
      ),
      children: [
        { path: "dashboard", element: <Dashboard /> },
        // { path: "select_patient", element: <SelectPatient /> },
        { path: "patient/:id", element: <Patient /> },
        { path: "patient/:id/order", element: <Orderchemotherapy /> },
        {
          path: "patient/:id/order/review-order",
          element: <Reviewchemotherapyorder />,
        },
        {
          path: "patient/:id/review-order",
          element: <Reviewchemotherapyorder />,
        },
        { path: "patient/:id/document", element: <Documentchemotherapy /> },
      ],
    },
  ]);

  return element;
};

export default ProjectRoutes;
