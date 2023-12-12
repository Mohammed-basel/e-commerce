import axios from "axios";
import React, { useContext } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { CartContext } from "../context/Cart.jsx";

export default function Product() {
  const { productId } = useParams();
  const { addToCartContext } = useContext(CartContext);

  const getproduct = async () => {
    const { data } = await axios.get(
      `https://ecommerce-node4.vercel.app/products/${productId}`
    );
    return data.product;
  };

  const { data, isLoading } = useQuery("product", getproduct);

  const addToCart = async (productId) => {
    const res = await addToCartContext(productId);
  };

  if (isLoading) {
    return <p>Loading....</p>;
  }

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-6">
          {data.subImages.map((img, index) => (
            <img
              key={index}
              src={img.secure_url}
              alt={`Product ${index}`}
              className="img-fluid mb-2 product-image"
              style={{ maxWidth: "80%", height: "auto", border: "1px solid #ddd", marginBottom: "10px" }}
            />
          ))}
        </div>
        <div className="col-md-6">
          <h2>{data.name}</h2>
          <p className="lead">${data.price}</p>
          <button
            className="btn btn-outline-info"
            onClick={() => addToCart(data._id)}
          >
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
}
