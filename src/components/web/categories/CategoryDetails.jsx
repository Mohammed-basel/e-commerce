import axios from "axios";
import React from "react";
import { useQuery } from "react-query";
import { Link, useParams } from "react-router-dom";

export default function CategoryDetails() {
  const { categoryId } = useParams();

  const getCategoriesDetailes = async () => {
    const { data } = await axios.get(`https://ecommerce-node4.vercel.app/products/category/${categoryId}`);
    return data.products;
  };

  const { data, isLoading } = useQuery("category_details", getCategoriesDetailes);

  if (isLoading) {
    return <p>Loading....</p>;
  }

  return (
    <div className="container mt-4">
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {data.length ? (
          data.map((product) => (
            <div className="col mb-4" key={product._id}>
              <div className="card">
                <img
                  src={product.mainImage.secure_url}
                  className="card-img-top"
                  alt={product.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{product.name}</h5>
                  <Link to={`/product/${product._id}`} className="btn btn-primary">
                    Details
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <h2>No products found in this category</h2>
        )}
      </div>
    </div>
  );
}
