import axios from "axios";
import React from "react";
import { useQuery } from "react-query";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Link } from "react-router-dom";

export default function Categories() {
  const getCategories = async () => {
    try {
      const { data } = await axios.get('https://ecommerce-node4.vercel.app/categories/active?limit=7');
      return data;
    } catch (error) {
      console.error("Error ", error);
    }
  };

  const { data, isLoading, isError } = useQuery("web_categories", getCategories);

  if (isLoading) {
    return <p>Loading....</p>;
  }

  if (isError) {
    return <p>Error loading categories</p>;
  }

  return (
    <div>
      <div className="container">
        <Swiper
          slidesPerView={4}
        >
          {data?.categories.length ? (
            data.categories.map((category) => (
              <SwiperSlide key={category._id}>
                <Link to={`products/category/${category._id}`}>
                  <div className="category">
                    <img
                      src={category.image.secure_url}
                      alt={category.name}
                      style={{ maxWidth: "30%", height: "auto" }} 
                    />
                  </div>
                </Link>
              </SwiperSlide>
            ))
          ) : (
            <h2>No categories found</h2>
          )}
        </Swiper>
        <div className="swiper-button-next"></div>
        <div className="swiper-button-prev"></div>
      </div>
    </div>
  );
}
