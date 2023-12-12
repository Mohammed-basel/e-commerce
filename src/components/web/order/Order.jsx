import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { CartContext } from "../context/Cart.jsx";
import './Order.css'
import { Link } from "react-router-dom";

export default function Order() {
  const { getCartContext } = useContext(CartContext);
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [coupon, setCoupon] = useState("");
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    const fetchCartItems = async () => {
      const { products } = await getCartContext();
      setCartData(products || []);
    };

    fetchCartItems();
  }, [getCartContext]);

  

  const calculateTotal = () => {
    return cartData.reduce((total, item) => total + item.details.price, 0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("userToken");
      const response = await axios.post(
        "https://ecommerce-node4.vercel.app/order",
        {
          couponName: coupon,
          address,
          phone,
          cartItems: cartData,
        },
        {
          headers: {
            Authorization: `Tariq__${token}`,
          },
        }
      );
      console.log(response);
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };

    return (
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-8">
            <h2>Your Cart Items</h2>
            {cartData.length > 0 ? (
              <div className="order-items">
                {cartData.map(item => (
                  <div key={item.details._id} className="order-item">
                    <div className="order-item-image">
                      <img src={item.details.mainImage.secure_url} alt={item.details.name} />
                    </div>
                    <div className="order-item-details">
                      <p>{item.details.name}</p>
                      <p>Price: ${item.details.price}</p>
                    </div>
                  </div>
                ))}
                <Link className="btn btn-secondary mt-3" to="/cart">
                  Go Back to Cart
                </Link>
              </div>
            ) : (
              <p>Your cart is empty</p>
            )}
          </div>
        <div className="col-md-4">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="phone" className="form-label">
                Phone
              </label>
              <input
                type="text"
                className="form-control"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="address" className="form-label">
                Address
              </label>
              <textarea
                className="form-control"
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              ></textarea>
            </div>
            <div className="coupon-container mb-3">
              <h2>Have a coupon?</h2>
              <p>Add your code for an instant cart discount</p>
              <div className="coupon-form">
                <input
                  type="text"
                  placeholder="Coupon Code"
                  value={coupon}
                  onChange={(e) => setCoupon(e.target.value)}
                />
                <button onClick={handleSubmit}>Apply</button>
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="total" className="form-label">
                Total
              </label>
              <div className="total-amount">${calculateTotal().toFixed(2)}</div>
            </div>
            <button type="submit" className="btn btn-primary w-100 py-3">
              Place Order
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}