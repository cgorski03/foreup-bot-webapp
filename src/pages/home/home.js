import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../utils/hooks/useAuth'
import CourseSelect from '../../components/home/courseSelect/CourseSelect'
import Navbar from '../../components/home/navbar/Navbar'
import './homeStyles.css'
const Home = () => {
    const navigate = useNavigate();
    const isAuthenticated = useAuth();
    //Initially blank, will have logic to show hide other info
    const [selectedCourse, setSelectedCourse] = useState('') 

    //This is a secured page
    useEffect(() => {
        if (isAuthenticated === false) {
          navigate('/login');
        }
      }, [isAuthenticated, navigate]);

    const handleCourseSelection = (selectedOption) => {
        setSelectedCourse(selectedOption.value);
        console.log(selectedCourse);  
    }
    return(
        <div id="homePageContainer">
                <div id="courseSelectionContainer">
                    <CourseSelect onCourseSelection={handleCourseSelection} />
        </div>
                <Navbar />
    </div>
    )
}
export default Home;