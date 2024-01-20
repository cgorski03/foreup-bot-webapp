import React from "react";
import { TailSpin } from "react-loader-spinner";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../utils/hooks/useAuth";
import CourseSelect from "../../components/home/courseSelect/CourseSelect";
import Navbar from "../../components/home/navbar/Navbar";
import Calendar from "../../components/home/calendar/Calendar";
import "./homeStyles.css";

const Home = () => {
  const navigate = useNavigate();
  const isAuthenticated = useAuth();
  //Initially blank, will have logic to show hide other info
  const [selectedCourse, setSelectedCourse] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [calendarEndDate, setCalendarEndDate] = useState<Date | null>(null);

  //This is a secured page
  useEffect(() => {
    if (isAuthenticated === false) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  const handleCourseSelection = (selectedOption: string): void => {
    setSelectedCourse(selectedOption);
    // TODO
    //This will be logic to determine how far in advance the  user can search based upon the golf course for now, when you select a course it is 7 days
    // Add 7 days to the current date
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 7);
    setCalendarEndDate(futureDate);
  };
  const handleDateSelection = (date: Date): void => {
    setSelectedDate(date);
    console.log(date);
  };

  if (isAuthenticated === null) {
    return (
      <div>
        <TailSpin color="white" width="40" wrapperClass="mainLoginPageLoader" />
      </div>
    );
  } else {
    return (
      <div id="homePageContainer">
        <Navbar />
        <div id="courseSelectionContainer">
          <CourseSelect onCourseSelection={handleCourseSelection} />
          <div id="courseDetailsContainer">
            <p style={{ marginLeft: 20 }}>
              placeholder course detail information
            </p>
            <p>Course Length: 6704</p>
          </div>

          <div id="searchDetailsContainer">
            <div id="dateSelectContainer">
              <Calendar
                onSelectedDateChange={handleDateSelection}
                courseEndDate={calendarEndDate}
              />
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
    );
  }
};
export default Home;
