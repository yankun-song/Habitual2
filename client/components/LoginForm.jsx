import React from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
// import { link } from 'react-router-dom';

const LoginForm = (props) => {
  const navigate = useNavigate();

  function submitForm() {
    const email = document.querySelector("#username-input").value;
    const password = document.querySelector("#password-input").value;
    const reqOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email, password: password }),
    };

    fetch("http://localhost:3000/test/login", reqOptions)
      .then((res) => res.json())
      .then((data) => {
        console.log("-----", data);
        if (data.userId) {
          // get state data from db
          // post a new request
          const req = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId: data.userId }),
          };

          fetch("http://localhost:3000/test/feed", req)
            .then((res) => res.json())
            .then((data) => {
              props.getFeed(data);
              navigate("/feed");
            });
        } 
      }); 
  } 

  function signupForm() {
    navigate("/signup");
  }

  return (
    <div id="login-form">
      <h1>Habitual</h1>
      {/* <Link to="/feed">About</Link> */}
      <div className="wrapper-login">
        <input
          autoComplete="off"
          type="text"
          className="login-input"
          id="username-input"
          name="username-input"
          placeholder="Email"
        />
        <input
          autoComplete="off"
          type="password"
          className="login-input"
          id="password-input"
          name="password-input"
          placeholder="Password"
        />
        <button className="login-btn" id="login-btn" onClick={submitForm}>
          Login
        </button>
        <div className="login-link" id="signup-btn" onClick={signupForm}>
          Don't have an account? <br></br>Signup
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
