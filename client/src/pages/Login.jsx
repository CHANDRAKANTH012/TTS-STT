import React from "react";

const Login = () => {
  return (
    <div className="container">
      <div className="left">
        <h3>Welcome back</h3>
        <p>Please enter your details:</p>

        <form action="" method="post">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" />

          <label htmlFor="password">password</label>
          <input type="password" id="password" />

          <div>
            <input type="checkbox" id="checkbox" name="remember me" />
            <a href="">forgot password</a>
          </div>

          <button type='submit'>Sign in</button>
        </form>
      </div>
      <div className="right">
        <img src="./logo.png" alt="large-logo" />
      </div>
    </div>
  );
};

export default Login;
