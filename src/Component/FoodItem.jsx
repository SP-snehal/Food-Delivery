// src/FoodItem.js

import React from 'react';

const FoodItem = ({ item, addToCart }) => {
    return (
        <div className="food-item">
            <img src={item.image} alt={item.name} />
            <h3>{item.name}</h3>
            <p>Rs {item.price.toFixed(2)}</p>
            <button onClick={() => addToCart(item) }>Add to Cart</button>
        </div>
    );
};

export default FoodItem;
