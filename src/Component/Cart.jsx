// src/Cart.js

import React from 'react';
import styles from '../cssstyles/cart.module.css';

const Cart = ({ cartItems, removeFromCart }) => {
    const totalPrice = cartItems.reduce((total, item) => total + item.price, 0);

    return (
        <div className="cart">
            
            <h2>Your Cart</h2>
            {cartItems.length === 0 ? (
                <p>No items in cart.</p>
            ) : (
                <div className={styles.cartItem}>
                    {cartItems.map((item, index) => (
                        <div key={index}>
                            <h4>{item.name}</h4>
                            <span className="price">Rs {item.price.toFixed(2)}</span>
                            <button onClick={() => removeFromCart(item)} className={styles.removebtn }>Remove</button>
                        </div>
                    ))}
                    <h3>Total: Rs {totalPrice.toFixed(2)}</h3>
                    
                </div>
            )}
        </div>
    );
};

export default Cart;
