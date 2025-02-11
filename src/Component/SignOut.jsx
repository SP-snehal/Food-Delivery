import React from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios, { Axios } from "axios";
import { useState } from "react";
import styles from '../cssstyles/signout.module.css';



function SignOut(){

  const navigate = useNavigate()
   const [first_name, setfirstname] = useState('');
   const [last_name, setlastname] = useState('');
   const [password, setPassword] = useState('');
   const [email, setEmail] = useState('');
   const [age, setage] = useState('');
   const [address, setaddress] = useState('');
   const [created_date, setcreated_date] = useState('');


   const handleSubmit = async (e) => {
    e.preventDefault();
    let payload ={
      first_name:first_name,
      last_name:last_name,
      password:password,
      email:email,
      age:age,
      address:address,
      created_date:created_date
    }

    const response = await axios.post("http://localhost:8083/api/v1/user", payload)
    console.log(response.data)
    if(response.status===200){
      toast.success("customer Added sucessfully");
      setTimeout(()=>{
        window.localStorage.reload()
      },200 )
      navigate('/Registration')
    }
   };
   return(
    <div className={styles.signoutfrom}>
      <form className={styles.signout} onSubmit={handleSubmit}>
      <h2>Register Here </h2>

    <label htmlFor="first_name">First Name</label>
    <input
    type="text"
    placeholder="name"
    name="first_name"
    value={first_name}
    onChange={(e) => setfirstname(e.target.value)}
    required
    /><br />
   <label htmlFor="last_name">LastName</label>
    <input
    type="text"
    placeholder="lastname"
    name="last_name"
    value={last_name}
    onChange={(e) => setlastname(e.target.value)}
    required
    /><br />
    <label htmlFor="password">Password</label>
    <input style={{display: "flex"}}
    type="password"
    placeholder="password"
    name="password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    required
    /><br />
    <label htmlFor="email">email</label>
    <input style={{display: "flex"}}
    type="text"
    placeholder="email"
    name="email"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    required
    /><br />
    <label htmlFor="age">Age</label>
    <input style={{display: "flex"}}
    type="text"
    placeholder="age"
    name="age"
    value={age}
    onChange={(e) => setage(e.target.value)}
    required
    /><br />
    <label htmlFor="address">Address</label>
    <input
    type="text"
    placeholder="address"
    name="address"
    value={address}
    onChange={(e) => setaddress(e.target.value)}
    required
    /><br />
   <label htmlFor="created_date">Created Date</label>
    <input
    type="date"
    placeholder="created_date"
    name="created_date"
    value={created_date}
    onChange={(e) => setcreated_date(e.target.value)}
    required
    /><br />
    <button type="submit" className={styles.submitbtn}>Submit</button>
    <button type="submit" className={styles.submitbtn } style={{marginTop: "-50px"}} onClick={() => navigate("/")}>Back</button>
   </form>
    </div>
   );
}
export default SignOut