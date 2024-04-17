import React, { useState, useEffect } from "react";
import axios from "axios";
import { useQuery } from "react-query";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { Link } from "react-router-dom";
import "swiper/css";
import "swiper/css/navigation";
import "./Categories.css";
import Loading from "../../loading/Loading";

export default function Categories() {
  const [discountedProducts, setDiscountedProducts] = useState([]);

  const getCategories = async () => {
    try {
      const { data } = await axios.get(
        "https://ecommerce-node4-five.vercel.app/categories/active?limit=7"
      );
      return data;
    } catch (error) {
      console.error("Error", error);
    }
  };

  const { data, isLoading, isError } = useQuery(
    "web_categories",
    getCategories
  );

  useEffect(() => {
    const fetchDiscountedProducts = async () => {
      try {
        const response = await axios.get(
          "https://ecommerce-node4-five.vercel.app/products?page=1&limit=10"
        );
        const productsWithDiscount = response.data.products.filter(
          (product) => product.discount > 0
        );
        setDiscountedProducts(productsWithDiscount);
      } catch (error) {
        console.error("Error fetching discounted products", error);
      }
    };

    fetchDiscountedProducts();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <p>Error loading categories</p>;
  }

  return (
    <div>
      <div className="header py-5">
        <div className="header-text mb-5">
          <h1 className="mb-5">Mohammed's Shop</h1>
        </div>
      </div>
      <div className="container mt-5">
        <Swiper
          className="custom-swiper mt-5"
          slidesPerView={4}
          modules={[Navigation]}
          navigation={true}
          pagination={{ clickable: true }}
        >
          {data?.categories.length ? (
            data.categories.map((category) => (
              <SwiperSlide key={category._id}>
                <Link to={`products/category/${category._id}`}>
                  <div className="category slider">
                    <img
                      src={category.image.secure_url}
                      alt={category.name}
                      style={{ maxWidth: "45%", height: "auto" }}
                    />
                  </div>
                </Link>
              </SwiperSlide>
            ))
          ) : (
            <h2>No categories found</h2>
          )}
        </Swiper>
      </div>

      <div className="discounted-products-section container my-5">
        <h2 className=" mb-4">Discounted Products</h2>
        <div className="discounted-products-row">
          {discountedProducts.map((product) => (
            <div key={product._id} className="discounted-products-card mx-3">
              <img
                src={product.mainImage.secure_url}
                alt="product image"
                className="discounted-products-card-img-top"
              />
              <div className="discounted-products-card-body">
                <h5 className="discounted-products-card-title">
                  {product.name}
                </h5>
                <div className="discounted-products-card-text"></div>
                <div className="discounted-products-price-container">
                  <p className="discounted-products-original-price">
                    ${product.price}
                  </p>
                  <p className="discounted-products-final-price">
                    ${product.finalPrice}
                  </p>
                </div>
                <p className="card-text">{product.stock} in stock</p>
                <Link
                  to={`/product/${product._id}`}
                  className="btn btn-primary mt-auto"
                >
                  Details
                </Link>
              </div>
            </div>
          ))}
        </div>
        <div className="view-more-button-container">
          <Link to="/allproducts" className="btn btn-outline-secondary">
            View All Products
          </Link>
        </div>
      </div>
      <footer className="footer bg-dark text-white py-2 mt-5">
        <div className="container text-center">
          <p className="pt-3">&copy; 2024 Mohammed's Shop.</p>
        </div>
      </footer>
    </div>
  );
}
