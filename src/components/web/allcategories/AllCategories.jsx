import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './AllCategories.css';

const AllCategories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('https://ecommerce-node4.vercel.app/categories/active?limit=7');
        setCategories(response.data.categories);
      } catch (error) {
        console.error('Error fetching categories', error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="categories-container">
      {categories.map((category) => (
        <Link key={category._id} to={`/products/category/${category._id}`} className="category-card">
          <div>
            {category.image && category.image.secure_url ? (
              <img src={category.image.secure_url} alt={category.name} className="category-image" />
            ) : (
              <div className="category-placeholder">Image not available</div>
            )}
          </div>
        </Link>
      ))}
    </div>
  );
};

export default AllCategories;
