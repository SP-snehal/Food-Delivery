import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import ReactPlayer from "react-player";
import styles from "../cssstyles/deliveryorders.module.css";
import Sidebar from "../Component/Sidebar";


const deliveryImagesClasses = ["avatar1", "avatar2", "avatar3"];

function DeliveryMen() {
  const [deliveryMen, setDeliveryMen] = useState([]);
  const [error, setError] = useState(null);


  const calculateExpectedTime = () => {
    const now = new Date();
    now.setHours(now.getHours() + 1);
    return now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: true });
  };

  
  const fetchDeliveryMen = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:9092/api/v1/delivery");

      if (response.data.length > 0) {
        const randomIndex = Math.floor(Math.random() * response.data.length);
        const randomPerson = response.data[randomIndex];

        const randomAvatarClass = deliveryImagesClasses[Math.floor(Math.random() * deliveryImagesClasses.length)];

        setDeliveryMen([
          {
            ...randomPerson,
            expectedTime: calculateExpectedTime(),
            avatarClass: randomAvatarClass, 
          },
        ]);
      } else {
        setDeliveryMen([]);
      }

      setError(null);
    } catch (err) {
      console.error("Error fetching delivery men:", err);
      setError("Failed to load delivery personnel. Please try again later.");
    }
  }, []);

  useEffect(() => {
    fetchDeliveryMen();
  }, [fetchDeliveryMen]);

  return (
    <div className={styles.imageipl}>
      <Sidebar />
      <div className={styles.orderContainer}>
        <h2>Delivery Personnel</h2>
        <ReactPlayer
          url="https://youtu.be/D9bwnJclcas"
          playing
          loop
          controls={false}
          muted
          width="100%"
          height="200px"
          config={{
            youtube: {
              playerVars: {
                modestbranding: 1,
                rel: 0,
                fs: 0,
                iv_load_policy: 3,
              },
            },
          }}
        />

        {error && <p className={styles.error}>{error}</p>}
        {deliveryMen.length === 0 && !error ? (
          <p>No delivery personnel found.</p>
        ) : (
          <ul>
            {deliveryMen.map((person, index) => (
              <li key={person.id || index} className={styles.orderItem}>
                <div className={`${styles.avatar} ${styles[person.avatarClass]}`}></div>
                <p className={styles.p}><strong>Name:</strong> {person.name}</p>
                <p><strong>Phone:</strong> {person.phone}</p>
                <p><strong>Delivery Time:</strong> {person.expectedTime}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default DeliveryMen;
