import React, { useEffect, useState } from "react";
import axios from "axios";
import "./UserOrders.css";

const UserOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const userToken = localStorage.getItem("userToken");
        const response = await axios.get(
          "https://ecommerce-node4.vercel.app/order",
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
    return <p>...Loading</p>;
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
                <th>Products</th>
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
                <td>
                  {order.products.map((product, index) => (
                    <div key={product._id}>
                      {index + 1}. Product ID: {product.productId}, Quantity:{" "}
                      {product.quantity}, Unit Price: ${product.unitPrice},
                      Final Price: ${product.finalPrice}
                    </div>
                  ))}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export default UserOrders;
