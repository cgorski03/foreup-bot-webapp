import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../utils/hooks/useAuth'

const Home = () => {
    const navigate = useNavigate();
    const isAuthenticated = useAuth();
    
    useEffect(() => {
        //This is a secured page
        if (isAuthenticated === false) {
          navigate('/login')
        }
      }, [isAuthenticated, navigate]);
}
export default Home;