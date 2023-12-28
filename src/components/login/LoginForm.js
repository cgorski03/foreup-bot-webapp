import React, { useState } from 'react'
import LoginButton from './inputFields/LoginButton'
import UsernameField from './inputFields/UsernameField'
import PasswordField from './inputFields/PasswordField'
import "./loginForm.css"

const LoginForm = () => {
    //using refs because we do not need to rerender
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    
    const handleUsernameChange = (newUsername) => {
        setUsername(newUsername);
    }
    const handlePasswordChange = (newPassword) => {
        setPassword(newPassword);
    }
    const handleLogin = () => {
        //callbacks setup
    }
    
    


    return (
        <div className="textField">
            <img src="/images/golf_bot_image.jpeg" className="appImage" alt=""/>
            <UsernameField onChange={handleUsernameChange}/>
            <PasswordField onChange={handlePasswordChange}/>
            <LoginButton onClick={handleLogin}/>
        </div>
    )
}

export default LoginForm