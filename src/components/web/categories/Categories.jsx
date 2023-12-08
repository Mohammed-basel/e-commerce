import axios from "axios";
import React from "react";
import { useQuery } from "react-query";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Link } from "react-router-dom";
import './Categories.css'

export default function Categories() {
  const getCategories = async () => {
    const { data } = await axios.get(
      `${import.meta.env.VITE_API_URL}/categories`
    );

    return data;
  };
  const { data, isLoading } = useQuery("web_categories", getCategories);
  if (isLoading) {
    return <p>Loading....</p>;
  }

  return (
    <div>
      <Swiper
        spaceBetween={50}
        slidesPerView={3}
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}
      >
        {data?.categories.length
          ? data?.categories.map((category) => (
              <SwiperSlide key={category._id}>
                <Link to={`products/category/${category._id}`}>
                  <div className="category">
                <img src={category.image.secure_url} className="rounded-circle" />
                <h2>{category.name}</h2>
                </div>
                </Link>
              </SwiperSlide>
            ))
          : <h2>no category found</h2>}
      </Swiper>
    </div>
  );
}
