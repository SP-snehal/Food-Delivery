// src/Cart.js

import React from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from '../cssstyles/cart.module.css';
import { toast } from "react-toastify";

const Cart = ({ cartItems, removeFromCart }) => {
    const totalPrice = cartItems.reduce((total, item) => total + item.price, 0);
    const navigate = useNavigate();

    const handleSubmit = async () => {
        if (cartItems.length === 0) {
            toast.error("Cart is empty!");
            return;
        }

        const payload = cartItems.map(item => ({
            food_name: item.name,
            price: item.price
        }));

        try {
            const response = await axios.post(
                "http://localhost:9092/api/v1/foodItem/add",
                payload,
                { headers: { "Content-Type": "application/json" } }
            );

            if (response.status === 200) {
                alert("Food items added successfully!");
                setTimeout(() => window.location.reload(), 200);
                navigate('/foodorder');
            }
        } catch (error) {
            console.error("Error posting data:", error);
            toast.error("Failed to add food items!");
        }
    };

    return (
        <div className={styles.cart}>
            <h2>Your Cart</h2>
            {cartItems.length === 0 ? (
                <p>No items in cart.</p>
            ) : (
                <>
                    {cartItems.map((item, index) => (
                        <div key={index} className={styles.cartBox}>
                            <div className={styles.itemInfo}>
                                <h4>{item.name}</h4>
                                <span className={styles.price}>₹ {item.price.toFixed(2)}</span>
                            </div>
                            <button onClick={() => removeFromCart(item)} className={styles.removebtn}>
                                Remove
                            </button>
                        </div>
                    ))}

                    <h3 className={styles.total}>Total: ₹ {totalPrice.toFixed(2)}</h3>
                    <button onClick={handleSubmit} className={styles.submitbtn}>
                        Submit Order
                    </button>
                </>
            )}
        </div>
    );
};

export default Cart;
