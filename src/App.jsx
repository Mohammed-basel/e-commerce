import { RouterProvider} from "react-router-dom";
import Layout from "./layouts/Layout.jsx";
import Home from "./components/web/home/Home.jsx";
import Categories from "./components/web/categories/Categories.jsx";
import CategoriesDashboard from "./components/dashboard/categoties/Categories.jsx";
import Register from "./components/web/register/Register";
import { createBrowserRouter } from "react-router-dom";
import {jwtDecode} from "jwt-decode";
import { useEffect, useState } from "react";
import SignIn from "./components/web/signin/SignIn.jsx";
import Dashboardlayout from "./layouts/Dashboardlayout.jsx";
import HomeDashboard from "./components/dashboard/home/Home.jsx"
import CategoriesDetails from "./components/web/categories/categoriesDetails.jsx";
import Product from "./components/web/products/Product.jsx";

export default function App() {


  const [user,setUser]=useState(null);
  const saveCurrentUser=()=>{
    const token = localStorage.getItem("userToken");
    const decoded = jwtDecode(token);
    setUser(decoded);
  }
  useEffect(()=>{
    if(localStorage.getItem("userToken")){
      saveCurrentUser();
    }
  },[])
 const router = createBrowserRouter([
  {
    path:'/',
    element:<Layout  user={user} setUser={setUser}/>,
    children:[
        {
          path:'register',
          element:<Register />
        },
        {
          path:'SignIn',
          element:<SignIn  saveCurrentUser={saveCurrentUser}/>
        },
        {
          index:true,
          element:<Home />
        },
        {
          path:'categories',
          element:<Categories />
        },
        {
          path:'products/category/:categoryId',
          element:<CategoriesDetails />
        },
        {
          path:'product/:productId',
          element:<Product />
        },
        {
          path:'*',
          element:<h2>page not found --- web</h2>
        }
    ]
  },
  {
      path:'/dashboard',
      element:<Dashboardlayout />,
      children:[{
      path:'home',
      element:<HomeDashboard />
    }
    ,{
      path:'categories',
      element:<CategoriesDashboard />
    },
    {
      path:'*',
      element:<h2>page not found --- dashboard</h2>
    }
  ]


  }
]);

  return (
    <RouterProvider router={router} />
  )}