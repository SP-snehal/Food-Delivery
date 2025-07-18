// src/App.js

import React from 'react';
import { Toaster } from 'react-hot-toast';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
// import './App.css'; // Optional: create this for basic styles
import Dashboard from './Component/Dashboard';
import LoginForm from './Component/LoginForm';
import Registration from './Component/Registration';
import SignOut from'./Component/SignOut';
import FoodConfirmation from './Component/FoodConfirmation';
import DeliveryOrders from './Component/DeliveryOrders'
import Sidebar from './Component/Sidebar';
import FoodHistory from './Component/FoodHistory';

const App = () => {
    

    return (
  
        <Router>
            <Routes>
                <Route path='/' element={<LoginForm />} index />
                <Route path='/Registration' element={<Registration/>}/>
                <Route path='/dashboard' element={<Dashboard />} />
                <Route path='/foodorder' element={<FoodConfirmation />} />
                <Route path='/signout' element={<SignOut/>}/>
                <Route path='/foodhistory' element={<FoodHistory/>}/>
                <Route path='/deliveryman' element={<DeliveryOrders/>}/>
                <Route path='/sidebar' element={<Sidebar/>}/>
            </Routes>
            <Toaster position="top-right" />
        </Router>
    );
};

export default App;
