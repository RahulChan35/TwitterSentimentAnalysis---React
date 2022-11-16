import React, { useState } from "react";
import ML from "../images/ml.jpg";
import "../css/SignUp.css";

const SignUp = () => {
  const [username, setUsername] = new useState("");
  const [email, setEmail] = new useState("");
  const [password, setPassword] = new useState("");

  return (
    <div className="signup-container">
      <div className="left">
        <img src={ML} className="ml" />
      </div>
      <div className="right">
        <h2>
          <b>SIGN-UP</b>
        </h2>
        <form action="/" method="post">
          <label for="uname">User Name: </label>
          <input
            className="effect-2"
            type="text"
            id="uname"
            name="name"
            placeholder="Enter your user name...."
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label for="email">Email: </label>
          <input
            className="effect-2"
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email...."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <br />
          <label for="password">Password: </label>
          <input
            className="effect-2"
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password...."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <a href="/Login"><input
            type="text"
            className="btn btn-primary button"
            value="SIGN-UP"
          /></a>
        </form>
          <p className="alr">Already have one?</p>
          <a href="/Login" className="log">Login</a>
      </div>
    </div>
  );
};

export default SignUp;
