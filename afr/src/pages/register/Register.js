import React from "react";
import {useState, useContext} from "react"
import { Link, Navigate, useNavigate } from "react-router-dom";
import "./register.scss";
import axios from 'axios'
import { makeRequest } from "../../axios";
import { AuthContext } from "../../context/authContext";
const Register = () => {

  const navigate = useNavigate()
  const [input, setInput] = useState({
    userName:"",
    email:"",
    password:"",
    firstname: ""
  })
  const [err, setErr] = useState(null)
  const inputHandler = (e)=>{
   setInput((prev)=>(
    {...prev, [e.target.name]:e.target.value}
   ))
  }
   
  const submitForm = async (e)=>{
   e.preventDefault()
   try{
      await makeRequest.post("/social/register", input )
      navigate("/login")
   }
   catch(err){
     setErr(err)
   }
  }

  return (
    <div className="register">
      <div className="card">
        <div className="left">
          <h1>Nova Social</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur
          </p>
          <span>have an account</span>
          <Link to="/login">
            <button>Login</button>
          </Link>
        </div>
        <div className="right">
          <h1>Register</h1>
          <form>
            <input type="text" onChange={inputHandler} name="userName" placeholder="UserName" />
            <input type="text" onChange={inputHandler}  name="firstname" placeholder="Name" />
            <input type="email" onChange={inputHandler}  name="email" placeholder="Email" />
            <input type="password" onChange={inputHandler}  name="password" placeholder="Password" />
            <button onClick={submitForm}>register</button>
          </form>
          {err && err}
        </div>
      </div>
    </div>
  );
};

export default Register;
