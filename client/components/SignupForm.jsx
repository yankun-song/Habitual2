import React from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";

const SignupForm = () => {
  const navigate = useNavigate();

  function loginForm() {
    navigate("/");
  }

  function signupFunc() {
    const firstName = document.querySelector("#firstname-input").value;
    const lastName = document.querySelector("#lastname-input").value;
    const username = document.querySelector("#username-input").value;
    const email = document.querySelector("#email-input").value;
    const password = document.querySelector("#password-input").value;

    const reqOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password, email, firstName, lastName }),
    };
 // send request to signup
    fetch("http://localhost:3000/signup", reqOptions)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          props.login({ userId: data.userId, username: data.username });
          const req = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId: data.userId }),
          };
          // if succeed, send a request to feed
          fetch("http://localhost:3000/feed", req)
            .then((res) => res.json())
            .then((data) => {
              props.getFeed(data);
              navigate("/feed");
            });
        }
      });
    // CHANGE ME TO DO THIS ON SUCCESSFUL USER CREATION
  }

  return (
    <div className="signup-form">
      <h1>Habitual</h1>
      <div className="wrapper-signup">
        <div className="signup-text">
          Please enter the following to create your account:
        </div>
        <input
          autoComplete="off"
          type="text"
          className="login-input signup-input"
          id="username-input"
          name="username-input"
          placeholder="Username"
        />
        <div className="signup-name-input">
          <input
            autoComplete="off"
            type="text"
            className="login-input signup-input"
            id="firstname-input"
            name="firstname-input"
            placeholder="First Name"
          />
          <input
            autoComplete="off"
            type="text"
            className="login-input signup-input"
            id="lastname-input"
            name="lastname-input"
            placeholder="Last Name"
          />
        </div>
        <input
          autoComplete="off"
          type="text"
          className="login-input signup-input"
          id="email-input"
          name="email-input"
          placeholder="Email"
        />
        <input
          autoComplete="off"
          type="password"
          className="login-input signup-input"
          id="password-input"
          name="password-input"
          placeholder="Password"
        />
        <button className="login-btn" id="login-btn" onClick={signupFunc}>
          Signup
        </button>
        <div className="login-link" id="login-btn" onClick={loginForm}>
          Already have an account? <br></br>Login
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
