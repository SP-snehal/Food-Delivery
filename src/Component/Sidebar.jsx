import React, { useState } from "react";
import { FaBars, FaChevronRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import styles from "../cssstyles/sidebar.module.css";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      
      <FaBars
        size={30}
        className={styles.hamburgerIcon}
        onClick={() => setIsOpen(true)}
      />

      
      <div className={`${styles.sidebar} ${isOpen ? styles.open : styles.close}`}>
        <h1 className={styles.sidebarTitle}>Food Delivery Details</h1>

        
        <FaChevronRight
          size={30}
          className={styles.closeIcon}
          onClick={() => setIsOpen(false)}
        />

        
        <nav className={styles.navLinks}>
          <Link to="/dashboard" onClick={() => setIsOpen(false)}>Dashboard</Link>
          <Link to="/foodorder" onClick={() => setIsOpen(false)}>Food Order</Link>
          <Link to="/foodhistory " onClick={() => setIsOpen(false)}>Food  History </Link>
          <Link to="/deliveryman" onClick={() => setIsOpen(false)}>Delivery Order Details</Link>
          <Link to="/ " onClick={() => setIsOpen(false)}>Log Out  </Link>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
