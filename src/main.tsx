import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Auth from "./pages/Auth/Auth.tsx";

import "bootstrap/dist/css/bootstrap.min.css";
import SignUp from "./pages/signUp/signUp.tsx";
import Dashboard from "./pages/Dashboard/Dashboard.tsx";
import LogIn from "./pages/LogIn/LogIn.tsx";
import ShowItemInfo from "./pages/ShowItemInfo/ShowItemInfo.tsx";
import AddProduct from "./pages/AddProduct/AddProduct.tsx";
import Editproduct from "./pages/Editproduct/Editproduct.tsx";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Auth />,
    children: [
      {
        path: "",
        element: (
          <LogIn
            logo="/assets/logo.svg"
            img="/assets/Upload icon.svg"
            h3="Sign In"
            p="Enter your credentials to access your account"
          />
        ),
      },
      {
        path: "signup",
        element: (
          <SignUp
            logo="/assets/logo.svg"
            img="/assets/Upload icon.svg"
            h3="Sign up"
            p="Fill in the following fields to create an account."
          />
        ),
      },
    ],
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/showiteminfo/:id",
    element: <ShowItemInfo />,
  },
  {
    path: "/addproduct",
    element: <AddProduct />,
  },
  {
    path: "/editproduct/:id",
    element: <Editproduct />,
  },
]);
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={routes} />
  </StrictMode>
);
