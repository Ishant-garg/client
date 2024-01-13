import { useState } from "react";
import React from "react";
import "./Login.scss";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axiosClient from "../../utils/axiosClient";
import { KEY_ACCESS_TOKEN, setItem } from "../../utils/manageLocalStorage";
import { IoEyeOutline } from "react-icons/io5";
import { IoMdEyeOff } from "react-icons/io";

const Login = () => {
  const location = useLocation();
  const signupSuccess = location.state && location.state.signupSuccess;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
 
    const [showPassword, setShowPassword] = useState(false);
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await axiosClient.post("/auth/login", {
        email,
        password,
      });
      
      navigate("/");
      setItem(KEY_ACCESS_TOKEN, response?.result?.AccessToken);

      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <div className="login">
        <div className="login-box">
          {signupSuccess && (
            <div className="signup-line">Successfully signed up! <br /> Now you can login.</div>
          )}
          <h2 className="login-heading">Login</h2>
          <form onSubmit={handleSubmit}>
            <label htmlFor="email">Enter email </label>
            <input
              type="email"
              className="email"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
            />

            <label htmlFor="password">Enter password</label>
          <div className="pass-field">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              id="password"
              className="password"
              onChange={(e) => setPassword(e.target.value)}
            />
           <div className="toogle-icon">
             {showPassword 
             ? < IoMdEyeOff className="ticon" onClick={()=>setShowPassword(false)} /> 
             :<IoEyeOutline className="ticon"  onClick={()=>setShowPassword(true)} /> }

           </div>

          </div>
 
            <input type="submit" value="SUBMIT" className="submit" />
          </form>
          <p>
            Does Not have account ? <Link to="/SignUp">SignUp</Link>{" "}
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
