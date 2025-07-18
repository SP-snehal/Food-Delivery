import React, { useState, useEffect } from "react";
import styles from "../cssstyles/foodconfirmation.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Sidebar from "../Component/Sidebar";
import { toast } from "react-toastify";

function FoodConfirmation() {
  const [foodItem, setFoodItem] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [showPopup, setShowPopup] = useState(false); 
  const [customer_name, setCustomer_name] = useState("");
  const [address, setAddress] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFoodData = async () => {
      try {
        const response = await axios.get(`http://localhost:9092/api/v1/foodItem`);
        setFoodItem(response.data);
        calculateTotal(response.data);
      } catch (error) {
        console.error("Error fetching food data:", error);
        toast.error("Failed to fetch food items.");
      }
    };
    fetchFoodData();
  }, []);

  const calculateTotal = (items) => {
    const total = items.reduce((sum, item) => sum + item.price, 0);
    setTotalPrice(total);
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:9092/api/v1/foodItem/${id}`);
      if (response?.status === 200) {
        toast.success("Food item deleted successfully!");
        const updatedFoodItems = foodItem.filter((item) => item.food_id !== id);
        setFoodItem(updatedFoodItems);
        calculateTotal(updatedFoodItems);
      }
    } catch (error) {
      console.error("Error deleting food item:", error);
      toast.error("Failed to delete food item.");
    }
  };


const handleOrder = async () => {
  if (!customer_name || !address) {
    toast.error("Please fill in all details.");
    return;
  }

  const orderDetails = {
    customer_name: "",
    address: "",
    items: foodItem,
    totalPrice,
  };

  try {
    const response = await axios.get(
      "http://localhost:9092/api/v1/Orders_details",
      orderDetails,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    toast.success("Your order has been placed successfully! Enjoy your meal!");

    navigate("/deliveryman");
  } catch (error) {
    console.error("Error placing order:", error);

    if (error.response) {
      toast.error(`Server Error: ${error.response.status} - ${error.response.data}`);
    } else if (error.request) {
      toast.error("No response from server. Check your network or server status.");
    } else {
      toast.error("Failed to place order. Please try again.");
    }
  }
}

  return (
    
    <div className={styles.foodConfirmation}>
       <div className="mainContent">
      <h1 className={styles.title}>All Food Item Cart</h1>
      <div className={styles.buttonContainer}>
  <button className={styles.backButton} onClick={() => navigate("/dashboard")}>
    Back
  </button>
  <button className={styles.orderButton} onClick={() => setShowPopup(true)}>
    Orders
  </button>
  <Sidebar />
</div>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>Food Name</th>
            <th>Price</th>
            <th className={styles.action}>Action</th>
          </tr>
        </thead>
        <tbody>
          {foodItem.map((foodItem) => (
            <tr key={foodItem.food_id}>
              <td>{foodItem.food_name}</td>
              <td>${foodItem.price.toFixed(2)}</td>
              <td>
                <button className={styles.submitbtn} onClick={() => navigate(`/dashboard`)}>
                  Edit
                </button>
                <button className={styles.submitbtn} onClick={() => handleDelete(foodItem.food_id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className={styles.totalPriceContainer}>
        <h2>Total Price: ${totalPrice.toFixed(2)}</h2>
      </div>

      {/* 🔹 Popup Modal for Order Placement */}
      {showPopup && (
        <div className={styles.orderContainer}>
          <div className={styles.orders}>
            <h2>Confirm Your Order</h2>
            <p><strong>Total Items:</strong> {foodItem.length}</p>
            <p><strong>Total Price:</strong> ${totalPrice.toFixed(2)}</p>

            <label>Customer Name:</label>
            <input
              type="text"
              value={customer_name}
              onChange={(e) => setCustomer_name(e.target.value)}
              required
            />

            <label>Delivery Address:</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />

            <button className={styles.submitbtn} onClick={handleOrder}>Place Order</button>
            <button className={styles.submitbtn} onClick={() => setShowPopup(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
    </div>
  );
}

export default FoodConfirmation;
