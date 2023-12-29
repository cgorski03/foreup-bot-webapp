import LoginForm from '../../components/login/LoginForm';
import { useNavigate } from 'react-router-dom';
import {TailSpin} from 'react-loader-spinner';
import useAuth from '../../utils/hooks/useAuth';
import { useEffect } from 'react'
import "./login.css"

const Login = () => {
  const navigate = useNavigate();
  const isAuthenticated = useAuth();
  
  const handleOnAuthentication = () => {
    navigate('/home')
  }

  useEffect(() => {
    //watch for isAuthenticated to become true
    if (isAuthenticated === true) {
      navigate('/home')
    }
  }, [isAuthenticated, navigate]);

  return (
    <div>
      {(isAuthenticated === null) ? <TailSpin
        color="white"
        width="40"
        wrapperClass="mainLoginPageLoader"
      />:
      <LoginForm onAuthentication={handleOnAuthentication} /> 
      }
      
    </div>
  );
};

export default Login;