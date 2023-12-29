import {useState } from 'react'
import LoginForm from '../../components/login/LoginForm';
import { getCurrentUser } from 'aws-amplify/auth';
import { useNavigate } from 'react-router-dom';
import "./login.css"

const Login = () => {
  const navigate = useNavigate();
  const checkAuthentication = async () => {
    try {
      await getCurrentUser();
      navigate('/home');
      setIsAuthenticated(true);
    } catch (err) {
      // The user is not signed in, they will see the login form
      setIsAuthenticated(false);
    }
  }
  const [isAuthenticated, setIsAuthenticated] = useState(checkAuthentication)

  
  const handleOnAuthentication = () => {
    //check the user's authentication again
    navigate('/home');
  }

  return (
    <div >
      { isAuthenticated ? '' : (
        <LoginForm onAuthentication={handleOnAuthentication} />
      )

      }
    </div>
  );
  
};

export default Login;