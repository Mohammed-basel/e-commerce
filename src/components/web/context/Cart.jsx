import axios from "axios";
import { toast } from "react-toastify";

import { createContext } from "react";

export const CartContext = createContext(null);

export function CartContextProvider({ children }) {
  const addToCartContext = async (productId) => {
    try {
      const token = localStorage.getItem("userToken");
      const { data } = await axios.post(
        "https://ecommerce-node4.vercel.app/cart",
        { productId },
        { headers: { Authorization: `Tariq__${token}` } }
      );
      if (data.message == "success") {
        toast("Product Add Successfully", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: 1,
          theme: "dark",
        });
      }
      return data;
    } catch (error) {
      console.log(error);
    }
  };
  const getCartContext = async ()=>{
try{
    const token = localStorage.getItem("userToken")
    const { data } = await axios.get(
        "https://ecommerce-node4.vercel.app/cart",
        { headers: { Authorization: `Tariq__${token}` } }
        
        );
        return data;

}catch(error){
    console.log(error)
}

  }
  const removeItemContext = async (productId)=>{
    try{
        const token = localStorage.getItem("userToken")
        const { data } = await axios.patch(
            "https://ecommerce-node4.vercel.app/cart/removeItem",
            { productId },
            { headers: { Authorization: `Tariq__${token}` } }
            
            );
            return data;
    
    }catch(error){
        console.log(error)
    }
  }

  return (
    <CartContext.Provider value={{ addToCartContext,getCartContext ,removeItemContext}}>
      {children}
    </CartContext.Provider>
  );
}
