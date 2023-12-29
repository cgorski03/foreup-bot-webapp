import React, { useState } from 'react'
import { signIn } from 'aws-amplify/auth'
import LoginButton from './inputFields/LoginButton'
import UsernameField from './inputFields/UsernameField'
import PasswordField from './inputFields/PasswordField'
import AuthorizationErrorMessage from './message/AuthorizationErrorMessage'
import "./loginForm.css"

const LoginForm = ({onAuthentication}) => {
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [loading, setLoader] = useState(false);
    const [loginErrorMessage, setLoginErrorMessage] = useState("");
    
    async function attemptLogin() {
        try {
            setLoader(true);
            const {isSignedIn, nextStep} = await signIn({username, password});
            setLoader(false);
            onAuthentication(); // call the parent callback function 
            console.log(isSignedIn + nextStep)
            // testing const { accessToken, idToken } = (await fetchAuthSession()).tokens ?? {};
        } catch (error) {
            setLoader(false);
            setLoginErrorMessage(error)
        }
      }

    const handleUsernameChange = (newUsername) => {
        setUsername(newUsername);
    }
    const handlePasswordChange = (newPassword) => {
        setPassword(newPassword);
    }
    const handleLogin = () => {
        attemptLogin();
    }
    const handleEnterKey = (event) => {
        if(event.key === 'Enter'){
          handleLogin();
        }else{
            // rerender the error message blank if the user is typing
            if(loginErrorMessage !== ""){
                setLoginErrorMessage("");
            }
        }
      }
    
    
    return (
        <div className="textField" onKeyDown={handleEnterKey}>
            <img src="/images/golf_bot_image.jpeg" className="appImage" alt=""/>
            <UsernameField onChange={handleUsernameChange}/>
            <PasswordField onChange={handlePasswordChange}/>
            <LoginButton onClick={handleLogin} loading={loading}/>
            <AuthorizationErrorMessage err={loginErrorMessage} />
        </div>
    )
}

export default LoginForm