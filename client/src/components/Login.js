import React, { useState } from "react";
import axios from "axios";

const Login = () => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const [credentials, setCredentials] = useState({
    username: "",
    password: ""
  });

  const handleInputChange = evt => {
    evt.preventDefault();
    console.log({ [evt.target.name]: evt.target.value });
    setCredentials({ ...credentials, [evt.target.name]: evt.target.value });
  };

  const handleFormSubmit = evt => {
    evt.preventDefault();
    console.log(credentials);
    axios
      .post(`http://localhost:5000/api/login`, credentials)
      .then(res => {
        localStorage.setItem("token", res.data.payload);
      })
      .catch(err => console.log(err.message));
  };

  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      <form onSubmit={handleFormSubmit}>
        <label htmlFor="username">
          Username:
          <input
            type="text"
            name="username"
            id="username"
            value={credentials.username}
            onChange={handleInputChange}
          />
        </label>
        <label htmlFor="password">
          Password:
          <input
            type="password"
            name="password"
            id="password"
            value={credentials.password}
            onChange={handleInputChange}
          />
        </label>
        <button type="submit">Log In</button>
      </form>
    </>
  );
};

export default Login;
