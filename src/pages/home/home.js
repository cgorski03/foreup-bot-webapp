import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../utils/hooks/useAuth'
import CourseSelect from '../../components/home/courseSelect/CourseSelect'
import './homeStyles.css'
const Home = () => {
    const navigate = useNavigate();
    const isAuthenticated = useAuth();
    //Initially blank, will have logic to show hide other info
    const [selectedCourse, setSelectedCourse] = useState('') 

    //This is a secured page
    useEffect(() => {
        if (isAuthenticated === false) {
          navigate('/login')
        }
      }, [isAuthenticated, navigate]);

    const handleCourseSelection = (selectedOption) => {
        setSelectedCourse(selectedOption.value)
    }
    return(
        <div id="courseSelectionContainer">
            <CourseSelect onCourseSelection={handleCourseSelection} />
        </div>
    )
}
export default Home;