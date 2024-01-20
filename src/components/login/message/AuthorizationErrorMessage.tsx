import React from "react";
import "./AuthorizationErrorMessage.css";

type AuthorizationErrorMessageProps = {
  error: string;
};
const AuthorizationErrorMessage = (props: AuthorizationErrorMessageProps) => {
  const { error } = props;

  const parseLoginMessage = () => {
    if (error === "") {
      return "";
    }
    switch (error) {
      case "username is required to signIn":
        return "Please provide a username and password";

      case "Incorrect username or password.":
        return "The username or password is incorrect";

      default:
        return "An error occurred during authorization.";
    }
  };
  return <div id="AuthorizationErrorMessageDisplay">{parseLoginMessage()}</div>;
};

export default AuthorizationErrorMessage;
