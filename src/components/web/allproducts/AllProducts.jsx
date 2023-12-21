import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";
import "./AllProducts.css";
import { Link } from "react-router-dom";
import Loading from "../../loading/Loading";

const ratingStars = (rating) => {
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

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [sortBy, setSortBy] = useState("");
  const productsPerPage = 4;

  useEffect(() => {
    const getAllProducts = async () => {
      setIsLoading(true);

      try {
        let url = `https://ecommerce-node4.vercel.app/products?page=${currentPage}&limit=${productsPerPage}`;
        if (sortBy === "stock") {
          url += `&sort=-stock`;
        } else if (sortBy) {
          url += `&sort=${sortBy}`;
        }

        const response = await axios.get(url);
        const { products, page, total } = response.data;

        setProducts(products);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    getAllProducts();
  }, [currentPage, sortBy]);

  const handlePageChange = (page) => {
    setCurrentPage((prevPage) =>
      prevPage !== page.selected + 1 ? page.selected + 1 : prevPage
    );
  };

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">All Products</h1>
      <div className="row mb-3">
        <div className="col-md-6">
          <select
            className="form-select"
            aria-label="Sort By"
            onChange={handleSortChange}
            value={sortBy}
          >
            <option value="" disabled>
              Sort By
            </option>
            <option value="name">Name</option>
            <option value="price">Price</option>
            <option value="stock">Stock</option>
          </select>
        </div>
      </div>
      {isLoading ? (
        <Loading/>
      ) : (
        <div className="row">
          {products.map((product) => (
            <div key={product._id} className="col-md-3 mb-4">
              <div className={`card all-products-card`}>
                <img
                  src={product.mainImage.secure_url}
                  alt="product image"
                  className={`card-img-top all-products-card-img-top`}
                />
                <div className={`card-body all-products-card-body`}>
                  <h5 className={`card-title all-products-card-title`}>
                    {product.name}
                  </h5>
                  <div className={`card-text all-products-card-text`}>
                    {ratingStars(product.avgRating)}
                  </div>
                  <div
                    className={`price-container all-products-price-container`}
                  >
                    <p className={`final-price all-products-final-price`}>
                      ${product.finalPrice}
                    </p>
                  </div>
                  <p className={`card-text`}>{product.stock} in stock</p>
                  <Link
                    to={`/product/${product._id}`}
                    className={`btn btn-primary all-products-btn-primary`}
                  >
                    Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      <ReactPaginate
        pageCount={2}
        pageRangeDisplayed={2}
        marginPagesDisplayed={1}
        onPageChange={handlePageChange}
        containerClassName={`pagination all-products-pagination`}
        activeClassName={`active`}
        pageClassName={`page-item`}
        pageLinkClassName={`page-link`}
        previousClassName={`page-item`}
        nextClassName={`page-item`}
        previousLinkClassName={`page-link`}
        nextLinkClassName={`page-link`}
      />
    </div>
  );
};

export default AllProducts;
