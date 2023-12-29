import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import useAuth from '../utils/hooks/useAuth'

const Callback = () => {
    const navigate = useNavigate();
    const isAuthenticated = useAuth();
    useEffect (() => {
        if(!isAuthenticated){
            navigate('/login');
            console.log("Redirecting from callback to login because " + isAuthenticated)
        }else{
          navigate('/home');
        }
    }, [navigate, isAuthenticated]);
  };
  
  export default Callback;