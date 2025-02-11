// src/App.js

import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
// Optional: create this for basic styles
import '../App.css';

import { useNavigate } from 'react-router-dom';
import Cart from './Cart';
import FoodList from './FoodList';

const Dashboard= () => {
    const navigate = useNavigate()
    const [cart, setCart] = useState([]);

    const addToCart = (item) => {
        setCart([...cart, item]);
    };

    const removeFromCart = (itemToRemove) => {
        setCart(cart.filter(item => item.id !== itemToRemove.id));
    };
    return (
        <div className="app">
            <header>
        <div class="logo">
        <span style={{marginLeft:"1370px"}}> <a href="https://www.instagram.com/snehalpatil034/" target="_blank" rel="noopener noreferrer">
        <FontAwesomeIcon icon={faInstagram} style={{ color: 'white' }} />
        </a>
        </span>  
               <span ><a href="https://www.linkedin.com/in/snehal-patil-a810972b1/" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faLinkedin} style={{ color: 'white' }} />
        </a></span> 
               <span> <a href="https://github.com/SP-snehal/webpage" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faGithub} style={{ color: 'white' }} />
        </a></span>

                </div>
                
                <h1>Food Delivery Service</h1>
                <button style={{padding:"10px, 15px", borderColor: "white"}} onClick={() => navigate("/")}>Back</button>
                {/* <button className={styles.submitbtn} onClick={() => navigate("/")}>Back</button> */}
            </header>
            <FoodList addToCart={addToCart} />
            <Cart cartItems={cart} removeFromCart={removeFromCart} />
        </div>
    );
};

export default Dashboard;
