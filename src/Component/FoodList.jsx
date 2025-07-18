// src/FoodList.js

import React from 'react';
import foodItems from '../data';
import FoodItem from './FoodItem';

const FoodList = ({ addToCart }) => {
    return (
        <div className="food-list">
            {foodItems.map(item => (
                <FoodItem key={item.id} item={item} addToCart={addToCart} />
            ))}
            
        </div>
        
    );
};

export default FoodList;
