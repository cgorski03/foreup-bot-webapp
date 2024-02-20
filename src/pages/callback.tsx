import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../utils/hooks/useAuth';

function Callback() {
  const navigate = useNavigate();
  const isAuthenticated = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    } else {
      navigate('/search');
    }
  }, [navigate, isAuthenticated]);

  return <div />;
}

export default Callback;
