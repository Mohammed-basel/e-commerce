import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import Register from "./../components/web/register/Register";
import SignIn from "./../components/web/signin/SignIn";
import Home from "./../components/web/home/Home";
import Cart from "./../components/web/cart/Cart";
import SendCode from "./../components/web/password/SendCode";
import ForgotPassword from "./../components/web/password/ForgotPassword";
import UserProfile from "./../components/web/userprofile/UserProfile";
import Categories from "../components/web/categories/Categories";
import CategoryDetails from "./../components/web/categories/CategoryDetails";
import Product from "./../components/web/products/Product";
import Dashboardlayout from "./Dashboardlayout";
import ProtectedRoute from "../components/web/protectedRoute/ProtectedRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "SignIn",
        element: <SignIn />,
      },
      {
        index: true,
        element: <Home />,
      },
      {
        path: "cart",
        element: 
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
      },
      {
        path: "sendcode",
        element: <SendCode />,
      },
      {
        path: "forgotpassword",
        element: <ForgotPassword />,
      },
      {
        path: "userprofile",
        element: <UserProfile />,
      },
      {
        path: "categories",
        element: <Categories />,
      },
      {
        path: "products/category/:categoryId",
        element: <CategoryDetails />,
      },
      {
        path: "product/:productId",
        element: <Product />,
      },
      {
        path: "*",
        element: <h2>page not found --- web</h2>,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <Dashboardlayout />,
    children: [
      {
        //path: "home",
        //element: <Homedashboard />,
      },
      {
        //path: "categories",
        //element: <CategoriesDashboard />,
      },
      {
        path: "*",
        element: <h2>page not found --- dashboard</h2>,
      },
    ],
  },
]);
