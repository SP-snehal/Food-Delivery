import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../Component/Sidebar";
import styles from "../cssstyles/foodhistory.module.css";

function FoodHistory() {
  const [history, setHistory] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    
    axios.get("http://localhost:9092/api/v1/Orders_details")
      .then((res) => {
        setHistory(res.data);
      })
      .catch((err) => {
        setError("Failed to load order history.");
        console.error(err);
      });
  }, []);

  return (
    <div className={styles.historyPage}>
    <Sidebar />
    <div className={styles.historyContainer}>
      <h2>Food Order History</h2>
  
      {error && <p className={styles.error}>{error}</p>}
  
      {history.length === 0 && !error ? (
        <p>No past orders found.</p>
      ) : (
        <div className={styles.tableWrapper}>
          <table className={styles.orderTable}>
            <thead>
              <tr>
                <th>Quantity</th>
                <th>Customer Name</th>
                <th>Total price</th>
                <th>Address</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {history.map((order, index) => (
                <tr key={index}>
                  <td>{order.quantity}</td>
                  <td>{order.customer_name}</td>
                  <td>${order.total_price}</td>
                  <td>{order.address}</td>
                  <td>Delivered</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  </div>
  
  );
}

export default FoodHistory;
 