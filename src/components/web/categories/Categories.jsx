import React from "react";
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
    return <Loading />;
  }

  if (isError) {
    return <p>Error loading categories</p>;
  }

  return (
    <div>
      <div className="header py-5 my-5">
        <div className="header-text mb-5">
          <h1 className="mb-5">Mohammed's shop</h1>
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
    </div>
  );
}
