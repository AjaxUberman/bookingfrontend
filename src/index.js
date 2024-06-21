import React from "react";
import "./index.css";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainPage from "./pages/MainPage";
import LoginPage from "./pages/LoginPage";
import Register from "./pages/Register";
import Layout from "./helpers/Layout";
import axios from "axios";
import { UserContextProvider } from "./UserContext";
import Account from "./pages/Account";
import PlacePage from "./pages/PlacePage";
import PlaceFormPage from "./pages/PlaceFormPage";

axios.defaults.baseURL = "https://booking-bkayikci-fullstack.onrender.com";

const AppRouter = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "login",
          element: <LoginPage />,
        },
        {
          path: "register",
          element: <Register />,
        },
        {
          path: "/",
          element: <MainPage />,
        },
        {
          path: `/account`,
          element: <Account />,
        },
        {
          path: `/account/bookings`,
          element: <Account />,
        },
        {
          path: `/account/places`,
          element: <Account />,
        },
        {
          path: `/account/:subpage/:action`,
          element: <Account />,
        },
        {
          path: `/account/places/:id`,
          element: <PlacePage />,
        },
        {
          path: `/account/places/:id/edit`,
          element: <PlaceFormPage />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

createRoot(document.getElementById("root")).render(
  <UserContextProvider>
    <AppRouter />
  </UserContextProvider>
);
