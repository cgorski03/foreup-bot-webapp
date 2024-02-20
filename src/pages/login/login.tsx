import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../../components/login/LoginForm';
import './login.css';
import LoadSecurePage from '../../components/search/loading/LoadSecurePage';

function Login() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  const handleOnAuthentication = () => {
    navigate('/search');
  };
  const handleLoadingResult = (result: boolean, error?: Error): void => {
    if (result) {
      handleOnAuthentication();
    } else {
      // TODO
      console.log(error);
      setIsAuthenticated(false);
    }
  };

  if (isAuthenticated === null) {
    return (
      <div>
        <LoadSecurePage onLoad={handleLoadingResult} />
      </div>
    );
  }
  return (
    <div>
      <LoginForm onAuthentication={handleOnAuthentication} />
    </div>
  );
}

export default Login;
