import React from 'react';
import { TailSpin } from 'react-loader-spinner';
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
    const [selectedCourse, setSelectedCourse] = useState<string>('') 
    
    //This is a secured page
    useEffect(() => {
        if (isAuthenticated === false) {
          navigate('/login');
        }
      }, [isAuthenticated, navigate]);

    const handleCourseSelection = (selectedOption: string): void => {
        setSelectedCourse(selectedOption);
        console.log(selectedOption);  
    }
    
    
    if(isAuthenticated === null){
      return (
        <div>
          <TailSpin
            color="white"
            width="40"
            wrapperClass="mainLoginPageLoader"
          />
        </div>
      );
    } else {
      return(
        <div id="homePageContainer">
          <Navbar />
          <div id="courseSelectionContainer">
              <CourseSelect onCourseSelection={handleCourseSelection} />
              <div id="courseDetailsContainer">
                <p style={{marginLeft:20}}>placeholder course detail information</p>
                <p>Course Length: 6704</p>
                <h1></h1>
              </div>

              <div id="searchDetailsContainer">
                <div id="dateSelectContainer">
                  <h1>caldendar</h1>
                </div>
                <div id="startEndTimeContainer">
                  <div id="startEndField">
                    <p>Start/End Times</p>
                  </div>
                  <div id="playersContactField">
                    <p>Players + Contact Confirmation</p>
                  </div>

                </div>
              </div>
          </div>
        </div>
    )
    }
}
export default Home;