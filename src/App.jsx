import { RouterProvider } from "react-router-dom";
import { router } from "./layouts/routes.jsx";
import { useContext, useEffect } from "react";
import { UserContext } from './components/web/context/User.jsx';
import { CartContext } from "./components/web/context/Cart.jsx";
export default function App() {

  let { setUserToken: SetUserToken } = useContext(UserContext);

  let {setCount,getCartContext} =useContext(CartContext);
  useEffect(()=>{
    if(localStorage.getItem("userToken") !=null){
      SetUserToken(localStorage.getItem("userToken"));
      setCount(getCartContext().count);
    }
  },[])
  
  return (
    
      
        <RouterProvider router={router} />
      
    
  );
}
