import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const userToken = localStorage.getItem('userToken');
        const response = await axios.get('https://ecommerce-node4.vercel.app/order', {
          headers: {
            Authorization: `Tariq__${userToken}`,
          },
        });
        if (response.data?.orders) {
          setOrders(response.data.orders);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className='user-orders-container'>
      <h2>User Orders</h2>
      <div>
        {orders.map((order) => (
          <div key={order._id} className="card mb-3">
            <div className="card-body">
              <h3 className="card-title">Order ID: {order._id}</h3>
              <p className="card-text">Final Price: ${order.finalPrice}</p>
              <p className="card-text">Address: {order.address}</p>
              <p className="card-text">Phone Number: {order.phoneNumber}</p>
              <p className="card-text">Payment Type: {order.paymentType}</p>
              <p className="card-text">Status: {order.status}</p>
              <p className="card-text">Order Date: {order.createdAt}</p>
              <div>
                <h4>Products:</h4>
                {order.products.length > 0 ? (
                  order.products.map((product) => (
                    <div key={product._id} className="card">
                      <div className="card-body">
                        <p className="card-text">Product ID: {product.productId}</p>
                        <p className="card-text">Quantity: {product.quantity}</p>
                        <p className="card-text">Unit Price: ${product.unitPrice}</p>
                        <p className="card-text">Final Price: ${product.finalPrice}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No products</p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserOrders;

