import { RouterProvider } from "react-router-dom";
import { CartContextProvider } from "./components/web/context/Cart.jsx";
import UserContextProvider from "./components/web/context/User.jsx";
import { router } from "./layouts/routes.jsx";
export default function App() {
  
  return (
    
      <CartContextProvider>
        <RouterProvider router={router} />
      </CartContextProvider>
    
  );
}
