import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';
import Sidebar from "../Component/Sidebar";
import '../App.css';
import { useNavigate } from 'react-router-dom';
import Cart from './Cart';
import FoodList from './FoodList';

const Dashboard = () => {
    const navigate = useNavigate();
    const [cart, setCart] = useState([]);
    const [showFood, setShowFood] = useState(false);

    const addToCart = (item) => {
        setCart([...cart, item]);
    };

    const removeFromCart = (itemToRemove) => {
        setCart(cart.filter(item => item.id !== itemToRemove.id));
    };

    const handleExploreClick = () => {
        setShowFood(true);
    };

    return (
        <div className="app">
            <div className="logo">
                <span style={{ marginLeft: "1380px" }}>
                    <a href="https://www.instagram.com/snehalpatil034/" target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={faInstagram} style={{ color: 'white' }} />
                    </a>
                </span>
                <span>
                    <a href="https://www.linkedin.com/in/snehal-patil-a810972b1/" target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={faLinkedin} style={{ color: 'white' }} />
                    </a>
                </span>
                <span>
                    <a href="https://github.com/SP-snehal/webpage" target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={faGithub} style={{ color: 'white' }} />
                    </a>
                </span>
            </div>

            <Sidebar />

            <section className="hero">
                <div className="hero">
                    <div className="hero-text">
                        <h2>Are You Hungry?</h2>
                        <h1>Don't wait!</h1>
                        <p>Let's start to order food right now</p>
                        <button className="explore-btn" onClick={handleExploreClick}>
                            Check Out Menu
                        </button>
                    </div>

                    <div className="video-wrapper">
                        <div className="video-bg-circle"></div>
                        <div className="image"></div>
                    </div>
                </div>
            </section>

            {showFood && (
                <>
                    <FoodList addToCart={addToCart} />
                    <Cart cartItems={cart} removeFromCart={removeFromCart} />
                </>
            )}
        </div>
    );
};

export default Dashboard;
