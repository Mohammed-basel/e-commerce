import axios from "axios";
import { toast } from "react-toastify";
import { createContext, useState } from "react";

export const CartContext = createContext(null);

export function CartContextProvider({ children }) {
  let [count, setCount] = useState(0);

  const addToCartContext = async (productId) => {
    try {
      const token = localStorage.getItem("userToken");
      const { data } = await axios.post(
        "https://ecommerce-node4-five.vercel.app/cart",
        { productId },
        { headers: { Authorization: `Tariq__${token}` } }
      );
      if (data.message === "success") {
        toast("Product Added Successfully", {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          theme: "dark",
        });
      }
      setCount(++count);
      return data;
    } catch (error) {
      if (error.response && error.response.status === 409) {
        toast("Product already in cart", {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          theme: "dark",
        });
      } else {
        console.log(error);
      }
    }
  };

  const getCartContext = async () => {
    try {
      const token = localStorage.getItem("userToken");
      const { data } = await axios.get(
        "https://ecommerce-node4-five.vercel.app/cart",
        { headers: { Authorization: `Tariq__${token}` } }
      );
      setCount(data.count);
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const removeItemContext = async (productId) => {
    try {
      const token = localStorage.getItem("userToken");
      const { data } = await axios.patch(
        "https://ecommerce-node4-five.vercel.app/cart/removeItem",
        { productId },
        { headers: { Authorization: `Tariq__${token}` } }
      );
      return data;
    } catch (error) {
      console.log(error);
    }
  };
  const clearCartContext = async () => {
    try {
      const token = localStorage.getItem("userToken");
      const { data } = await axios.patch(
        "https://ecommerce-node4-five.vercel.app/cart/clear",
        {},
        { headers: { Authorization: `Tariq__${token}` } }
      );
      if (data.message === "success") {
        toast("Cart Cleared Successfully", {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          theme: "dark",
        });
      }
      setCount(0);
      return data;
    } catch (error) {
      console.log(error);
    }
  };
  const increaseQuantityContext = async (productId) => {
    try {
      const token = localStorage.getItem("userToken");
      const { data } = await axios.patch(
        "https://ecommerce-node4-five.vercel.app/cart/incraseQuantity",
        { productId },
        { headers: { Authorization: `Tariq__${token}` } }
      );
      setCount(++count);
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const decreaseQuantityContext = async (productId) => {
    try {
      const token = localStorage.getItem("userToken");
      const { data } = await axios.patch(
        "https://ecommerce-node4-five.vercel.app/cart/decraseQuantity",
        { productId },
        { headers: { Authorization: `Tariq__${token}` } }
      );
      setCount(--count);
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <CartContext.Provider
      value={{
        addToCartContext,
        getCartContext,
        removeItemContext,
        clearCartContext,
        increaseQuantityContext,
        decreaseQuantityContext,
        count,
        setCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
