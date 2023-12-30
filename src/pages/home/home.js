import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../utils/hooks/useAuth'
import CourseSelect from '../../components/home/courseSelect/CourseSelect'
import './homeStyles.css'
const Home = () => {
    const navigate = useNavigate();
    const isAuthenticated = useAuth();

    useEffect(() => {
        //This is a secured page
        if (isAuthenticated === false) {
          navigate('/login')
        }
      }, [isAuthenticated, navigate]);

    return(
        <div id="courseSelectionContainer">
            <CourseSelect />
        </div>
    )
}
export default Home;