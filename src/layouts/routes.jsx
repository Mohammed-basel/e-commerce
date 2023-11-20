import {createBrowserRouter} from "react-router-dom";
import Layout from "./Layout.jsx";
import Home from "./../components/web/home/Home.jsx";
import Categories from "./../components/web/categories/Categories.jsx";
import Dashbordlayout from "./Dashboardlayout.jsx";
import Homedashboard from "./../components/dashboard/home/Home.jsx";
import CategoriesDashboard from "./../components/dashboard/categoties/Categories.jsx";

export const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout/>,
      children:[
        {
        path: 'home',
        element:<Home/>
        },
        {
          path: 'categories',
          element:<Categories/>
          },
          {
            path:'*',
            element:<h2>page not found ---- web</h2>
          }
      ]
    },
    {
      path: "/dashboard",
      element: <Dashbordlayout/>,
      children:[{
        path: 'home',
        element: <Homedashboard/>
      },
      {
        path: 'categories',
        element: <CategoriesDashboard/>
      },
      {
        path:'*',
        element:<h2>page not found ---- admin</h2>
      }
    ]
    },
  ]);

