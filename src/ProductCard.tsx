import React from 'react';
import { Product } from './types/ProductType';
import './App.css';

interface ProductCardProps extends Product {}

const ProductCard: React.FC<ProductCardProps> = ({ id, name, price, category, image }) => {
    return (
      <div className='product-info'>
        <div className='product-details'>
          <h3>{name}</h3>
          <p>Price: ${price}</p>
          <p>Category: {category}</p>
          <img className='product-image' src={image} alt={name} />
          <hr />
        </div>
      </div>
    );
};

export default ProductCard;