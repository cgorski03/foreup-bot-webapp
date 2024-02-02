import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import CourseSelect from "../../components/home/courseSelect/CourseSelect";
import Navbar from "../../components/home/navbar/Navbar";
import { UserInformationContext } from "../../Contexts/UserContext";
import "./homeStyles.css";
import { SearchInfoForm } from "../../components/home/searchInformationForm/SearchInfoForm";
import { LoadSecurePage } from "../../components/home/loading/LoadSecurePage";

const Home = () => {
  const { userInfo } = useContext(UserInformationContext);
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [selectedCourse, setSelectedCourse] = useState<number|null>(null);
  const [calendarEndDate, setCalendarEndDate] = useState<Date | null>(null);

  const handleCourseSelection = (selectedCourseId: number, courseBookingDays: number): void => {
    setSelectedCourse(selectedCourseId);
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + courseBookingDays);
    setCalendarEndDate(futureDate);
  };

  const handleLoadingResult = (result: boolean, error?: Error): void => {
    result ? setIsAuthenticated(true) : navigate("/login");
  };

  if (isAuthenticated === null) {
    return (
      <div>
        <LoadSecurePage onLoad={handleLoadingResult} />
      </div>
    );
  } else {
    return (
      <div id="homePageContainer">
        <Navbar />
        <div id="courseSelectionContainer">
          <CourseSelect onCourseSelection={handleCourseSelection} />
          <div id="courseDetailsContainer">
            <p style={{ marginLeft: 20 }}>Hello, {userInfo?.name}</p>
            <p>Course Length: 6704</p>
          </div>
          <SearchInfoForm calendarEndDate={calendarEndDate} />
        </div>
      </div>
    );
  }
};
export default Home;
