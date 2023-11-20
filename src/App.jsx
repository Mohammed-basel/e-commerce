import {RouterProvider} from "react-router-dom";
import { router } from "./layouts/routes.jsx";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js'

export default function App(){
  return(
    <RouterProvider router={router}/>
  )
}