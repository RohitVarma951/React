import React, { useState } from "react";
import "./Login.css";
import logo from "../../assets/logo.png";
import { login, signup } from "../../firebase";
import neetflix_spinner from "../../assets/netflix_spinner.gif";

const Login = () => {
  const [singleSign, setSingleSign] = useState("Sign In");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const user_auth = async (event) => {
    event.preventDefault();
    setLoading(true);
    if (singleSign==="Sign In") {
      await login(email, password);
    } else {
      await signup(name, email, password);
    }
    setLoading(false);
  }
  return (
    loading
    ? <div className="login-spinner">
      <img src={neetflix_spinner} alt="" />
    </div>
    : <div className="login">
      <img src={logo} alt="" className="login-logo" />
      <div className="login-form">
        <h1>{singleSign}</h1>
        <form>
          { singleSign==="Sign Up" ? <input type="text" placeholder="Your Name" value={name} onChange={(e) => {setName(e.target.value)}} /> : <></> }
          <input type="email" placeholder="Your Email" value={email} onChange={(e) => {setEmail(e.target.value)}} />
          <input type="password" placeholder="Password" value={password} onChange={(e) => {setPassword(e.target.value)}} />
          <button onClick={user_auth} type="submit">{singleSign}</button>
          <div className="form-help">
            <div className="remember">
              <input type="checkbox" name="" id="" />
              <label htmlFor="">Remember Me</label>
            </div>
            <p>Need Help?</p>
          </div>
        </form>
        <div className="form-switch">
          { singleSign==="Sign In" ? <p>New to Netflix? <span onClick={() => setSingleSign("Sign Up")}>Sign Up</span></p> : <></> }
          { singleSign==="Sign Up" ? <p>Already have an Account <span onClick={() => setSingleSign("Sign In")}>Sign In</span></p> : <></> }
        </div>
      </div>
    </div>
  )
}

export default Login;