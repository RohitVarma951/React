import React, { useState } from "react";
import "./CSS/LoginSignup.css";

const LoginSignup = () => {
  const [state, setState] = useState("Login");
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: ""
  });
  const changeHandler = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value})
  };
  const login = async () => {
    let responseData;
    await fetch("http://localhost:4000/login", {
      method: "POST",
      headers: {
        Accept: "application/form-data",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    }).then((response) => response.json()).then((data) => responseData=data);
    if(responseData.success) {
      localStorage.setItem("auth-token", responseData.token);
      window.location.replace("/");
    } else {
      alert(responseData.errors);
    }
  };
  const signup = async () => {
    let responseData;
    await fetch("http://localhost:4000/signup", {
      method: "POST",
      headers: {
        Accept: "application/form-data",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    }).then((response) => response.json()).then((data) => responseData=data);
    if(responseData.success) {
      localStorage.setItem("auth-token", responseData.token);
      window.location.replace("/");
    } else {
      alert(responseData.errors);
    }
  };
  return (
    <div className="login-signup">
      <div className="login-signup-container">
        <h1>{state}</h1>
        <div className="login-signup-fields">
          {
            state==="Sign Up"
              ? <input type="text" placeholder="Your Name" name="username" value={formData.username} onChange={changeHandler} />
              : <></>
          }
          <input type="email" placeholder="Email Address" name="email" value={formData.email} onChange={changeHandler} />
          <input type="password" placeholder="Password" name="password" value={formData.password} onChange={changeHandler} />
        </div>
        <button onClick={() => {state==="Login" ? login() : signup() }}>Continue</button>
        {
          state==="Sign Up"
            ? <p className="login-signup-login">Already have an account? <span onClick={() => setState("Login")}>Login here</span></p>
            : <p className="login-signup-login">New User? <span onClick={() => setState("Sign Up")}>Sign Up here</span></p>
        }
        <div className="login-signup-agree">
          <input type="checkbox" name="" id="" />
          <p>By continuing, i agree to the terms of use & privacy policy.</p>
        </div>
      </div>
    </div>
  )
}

export default LoginSignup;