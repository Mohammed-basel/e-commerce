import React from "react";
import axios from "axios";
import { useQuery } from "react-query";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { Link } from "react-router-dom";
import "swiper/css";
import "swiper/css/navigation";
import "./Categories.css";

export default function Categories() {
  const getCategories = async () => {
    try {
      const { data } = await axios.get(
        "https://ecommerce-node4.vercel.app/categories/active?limit=7"
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

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error loading categories</p>;
  }

  return (
    <div>
      <div className="header">
        <img
          src="assets/img/sarah-dorweiler-x2Tmfd1-SgA-unsplash.jpg"
          alt="Header Image"
          style={{ width: "100%", height: "80vh", objectFit: "cover" }}
        />
        <div className="header-text">
          <h1>Mohammed's shop</h1>
        </div>
      </div>
      <div className="container">
        <Swiper
          className="custom-swiper"
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
    </div>
  );
}
