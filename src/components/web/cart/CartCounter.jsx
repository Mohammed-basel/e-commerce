import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function CartCounter() {
  const [cartData, setCartData] = useState(null);

  useEffect(() => {
    const token = "Tariq__" + localStorage.getItem('userToken');
    if (!token) {
      console.log("No token found");
      return;
    }

    const url = 'https://ecommerce-node4.vercel.app/cart';
    const config = {
      headers: { 'Authorization': token }
    };

    const fetchCartData = async () => {
      try {
        const response = await axios.get(url, config);
        setCartData(response.data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchCartData();
    const intervalId = setInterval(fetchCartData, 5 * 60 * 1000);

    return () => clearInterval(intervalId);
  }, [cartData]);

  if (!cartData) {
    return null;
  }

  return (
    <span>({cartData.count})</span>
  );
}
