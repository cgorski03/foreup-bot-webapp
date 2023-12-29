import React from 'react'
import './AuthorizationErrorMessage.css'
const AuthorizationErrorMessage = ({ err }) => {
    const parseLoginMessage = () => {
        if(err === ""){
            return ""
        }
        switch(err.message) {
            case "username is required to signIn": 
                return "Please provide a username and password";

            case "Incorrect username or password.": 
                return "The username or password is incorrect";

            default:
                return 'An error occurred during authorization.';
        }
    }
    return (
    <div id="AuthorizationErrorMessageDisplay">
        {parseLoginMessage()}</div>
  )
}

export default AuthorizationErrorMessage