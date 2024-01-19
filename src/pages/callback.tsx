import React from 'react';
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import useAuth from '../utils/hooks/useAuth'

const Callback: React.FC = () => {
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

    return (
      <div />
    )
  };
  
  export default Callback;