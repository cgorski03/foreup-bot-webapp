import React, {useState} from "react";
import { LoginForm } from "../../components/login/LoginForm";
import { useNavigate } from "react-router-dom";
import "./login.css";
import { LoadSecurePage } from "../../components/search/loading/LoadSecurePage";

const Login = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  const handleOnAuthentication = () => {
    navigate("/search");
  };
  const handleLoadingResult = (result: boolean, error?: Error): void => {

    result ? setIsAuthenticated(true) : setIsAuthenticated(false);
  };

  if (isAuthenticated === null) {
    return (
      <div>
        <LoadSecurePage onLoad={handleLoadingResult} />
      </div>
    );
  } else {
    return (
      <div>
        <LoginForm onAuthentication={handleOnAuthentication} />
      </div>
    );
  }
};

export default Login;