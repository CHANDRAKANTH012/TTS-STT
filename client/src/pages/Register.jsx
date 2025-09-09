import React from "react";

const Register = () => {
  return (
    <div className="container">
      <div className="left">
        <img src="./logo.png" alt="large-logo" />
      </div>

      <div className="right">
        <h3>Welcome to Voice now</h3>
        <p>Please enter your details:</p>

        <form action="" method="post">
          <label htmlFor="name">Name</label>
          <input type="text" id="name" />

          <label htmlFor="email">Email</label>
          <input type="email" id="email" />

          <label htmlFor="password">password</label>
          <input type="password" id="password" />

          <div>
            <input type="checkbox" id="checkbox" name="remember me" />
          </div>

          <button type="submit">Sign up</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
