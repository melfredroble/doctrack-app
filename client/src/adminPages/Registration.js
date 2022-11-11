import React, { useEffect, useState } from "react";
import Axios from "axios";

export default function Registration() {
  const [emailReg, setemailReg] = useState("");
  const [passwordReg, setPasswordReg] = useState("");

  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");

  const [loginStatus, setLoginStatus] = useState("");

  Axios.defaults.withCredentials = true;

  const register = async () => {
    await Axios.post("http://localhost:5000/register", {
      email: emailReg,
      password: passwordReg,
    }).then((response) => {
      console.log(response);
    });
  };

  const login = async () => {
    await Axios.post("http://localhost:5000/login", {
      email: email,
      password: password,
    }).then((response) => {
      if (response.data.message) {
        setLoginStatus(response.data.message);
      } else {
        setLoginStatus(response.data[0].email);
      }
    });
  };

  useEffect(() => {
    Axios.get("http://localhost:5000/login").then((response) => {
      if (response.data.loggedIn == true) {
        setLoginStatus(response.data.user[0].email);
      }
    });
  }, []);

  return (
    <div className="App">
      <div className="registration">
        <h1>Registration</h1>
        <label>email</label>
        <input
          type="email"
          onChange={(e) => {
            setemailReg(e.target.value);
          }}
        />
        <label>Password</label>
        <input
          type="text"
          onChange={(e) => {
            setPasswordReg(e.target.value);
          }}
        />
        <button onClick={register}> Register </button>
      </div>

      <div className="login">
        <h1>Login</h1>
        <input
          type="text"
          placeholder="email..."
          onChange={(e) => {
            setemail(e.target.value);
          }}
        />
        <input
          type="password"
          placeholder="Password..."
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <button onClick={login}> Login </button>
        <form action="http://localhost:5000/logout" method="GET">
          <button type="submit">Logout</button>
        </form>
      </div>

      <h1>{loginStatus}</h1>
    </div>
  );
}