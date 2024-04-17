import axios from "axios";
import React, { useContext, useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { CartContext } from "../context/Cart.jsx";
import { toast } from "react-toastify";
import "./Product.css";
import Loading from "../../loading/Loading.jsx";

const StarRating = ({ rating }) => {
  const stars = [];
  for (let i = 0; i < 5; i++) {
    stars.push(
      <svg
        key={i}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill={i < rating ? "#FFD700" : "#e4e5e9"}
        width="24px"
        height="24px"
      >
        <path d="M0 0h24v24H0z" fill="none" />
        <path d="M12 2l2.4 7.2h7.6l-6 4.8 2.4 7.2-6-4.8-6 4.8 2.4-7.2-6-4.8h7.6z" />
      </svg>
    );
  }
  return <div>{stars}</div>;
};

export default function Product() {
  const { productId } = useParams();
  const { addToCartContext } = useContext(CartContext);
  const [selectedImage, setSelectedImage] = useState(null);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);

  const getProduct = async () => {
    const { data } = await axios.get(
      `https://ecommerce-node4-five.vercel.app/products/${productId}`
    );
    return data.product;
  };

  const { data, isLoading } = useQuery("product", getProduct);

  const addToCart = async (productId) => {
    await addToCartContext(productId);
  };

  const submitReview = async () => {
    try {
      const token = localStorage.getItem("userToken");

      const response = await axios.post(
        `https://ecommerce-node4-five.vercel.app/products/${productId}/review`,
        { comment, rating },
        { headers: { Authorization: `Tariq__${token}` } }
      );

      if (response.data.message === "success") {
        toast("Review submitted successfully!", {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          theme: "dark",
        });
      }
    } catch (error) {
      console.error("Error submitting review:", error);
      toast.error("already reviewed this product .", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        theme: "dark",
      });
    }
  };
  if (isLoading) {
    return <Loading/>;
  }

  return (
    <div className="container my-4 product-page">
      <div className="row">
        <div className="col-md-1">
          <div className="d-flex flex-column thumbnails">
            {data.subImages.map((img, index) => (
              <img
                key={index}
                src={img.secure_url}
                alt={`Product ${index}`}
                className="img-thumbnail mb-2"
                onClick={() => setSelectedImage(img.secure_url)}
              />
            ))}
          </div>
        </div>
        <div className="col-md-5">
          <img
            src={selectedImage || data.subImages[0].secure_url}
            alt="Product"
            className="img-fluid mb-2 product-image"
          />
        </div>
        <div className="col-md-6">
          <h2>{data.name}</h2>
          <p className={`lead ${data.discount > 0 ? "discounted-price" : ""}`}>
            {data.discount > 0 && <del>${data.price}</del>} $
            {data.discount > 0 ? data.finalPrice : data.price}{" "}
            {data.discount > 0 && `(Save $${data.discount}%)`}
          </p>
          <p>{data.description}</p>
          <button
            className=" btn-add-to-cart mt-3"
            onClick={() => addToCart(data._id)}
          >
            Add To Cart
          </button>
        </div>
      </div>

      <div className="row mt-4 reviews-section">
        <div className="col-lg-8">
          <h3>Product Reviews</h3>
          {data.reviews.length > 0 ? (
            <div className="list-group">
              {data.reviews.map((review, index) => (
                <div key={index} className="list-group-item review-item">
                  <div className="reviewer-info">
                    <img
                      src={review.createdBy.image.secure_url}
                      alt={`${review.createdBy.userName}'s profile`}
                      className="reviewer-image"
                    />
                    <p className="review-user">
                      By: {review.createdBy.userName}
                    </p>
                  </div>
                  <StarRating rating={review.rating} />
                  <p className="review-comment">{review.comment}</p>
                </div>
              ))}
            </div>
          ) : (
            <p>No reviews available for this product.</p>
          )}
        </div>
        <div className="col-lg-4">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              submitReview();
            }}
            className="review-form"
          >
            <h3>Write a Review</h3>
            <div className="form-group">
              <label htmlFor="comment">Your Review:</label>
              <textarea
                id="comment"
                className="form-control"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="rating">Rating:</label>
              <select
                id="rating"
                className="form-control"
                value={rating}
                onChange={(e) => setRating(parseInt(e.target.value, 10))}
                required
              >
                <option value="" disabled>
                  Select Rating
                </option>
                <option value="1">1 - Poor</option>
                <option value="2">2 - Fair</option>
                <option value="3">3 - Good</option>
                <option value="4">4 - Very Good</option>
                <option value="5">5 - Excellent</option>
              </select>
            </div>
            <button type="submit" className="btn btn-primary">
              Submit Review
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
