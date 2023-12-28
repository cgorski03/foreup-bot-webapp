import React from 'react'
import Username from "../../components/login/fields/Username";
import Password from "../../components/login/fields/Password";
import LoginButton from "../../components/login/button/LoginButton";
import "./login.css"

const Login = () => {
    return (
        <div className = "textField">
          <img src="/images/golf_bot_image.jpeg" className="appImage" alt=""/>
          <Username className="usernameField"/>
          <Password />
          <LoginButton />
        </div>
      );
};

export default Login;