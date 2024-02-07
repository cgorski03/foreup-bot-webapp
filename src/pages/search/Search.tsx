import "./searchStyles.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CourseSelect from "../../components/home/courseSelect/CourseSelect";
import { SearchInfoForm } from "../../components/home/searchInformationForm/SearchInfoForm";
import { LoadSecurePage } from "../../components/home/loading/LoadSecurePage";
import { PageHeader } from "../../components/home/pageHeader/pageHeader";
import { GolfCourse } from "../../utils/api/types";
const Home = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [selectedCourse, setSelectedCourse] = useState<GolfCourse | null>(null);

  const handleCourseSelection = (course: GolfCourse): void => {
      setSelectedCourse(course);
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
        <PageHeader />
        <div id="courseSelectionContainer">
          <CourseSelect onCourseSelection={handleCourseSelection} /> 
          <div className="dividerLineDiv"/>
          <SearchInfoForm course={selectedCourse} />
        </div>
      </div>
    );
  }
};
export default Home;
