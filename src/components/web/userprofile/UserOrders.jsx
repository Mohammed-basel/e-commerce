import React, { useEffect, useState } from "react";
import axios from "axios";
import "./UserOrders.css";
import Loading from './../../loading/Loading';

const UserOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const userToken = localStorage.getItem("userToken");
        const response = await axios.get(
          "https://ecommerce-node4-five.vercel.app/order",
          {
            headers: {
              Authorization: `Tariq__${userToken}`,
            },
          }
        );
        if (response.data?.orders) {
          setOrders(response.data.orders);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">User Orders</h2>
      {orders.map((order) => (
        <div key={order._id} className="mb-5">
          <h3>Order ID: {order._id}</h3>
          <table className="table table-responsive-md">
            <thead className="thead-light">
              <tr>
                <th>Final Price</th>
                <th>Address</th>
                <th>Phone Number</th>
                <th>Payment Type</th>
                <th>Status</th>
                <th>Order Date</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>${order.finalPrice}</td>
                <td>{order.address}</td>
                <td>{order.phoneNumber}</td>
                <td>{order.paymentType}</td>
                <td>{order.status}</td>
                <td>{order.createdAt}</td>
              </tr>
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export default UserOrders;
