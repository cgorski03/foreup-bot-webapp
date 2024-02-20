import React, { useState } from 'react';
import './searchStyles.css';
import { useNavigate } from 'react-router-dom';
import CourseSelect from '../../components/search/courseSelect/CourseSelect';
import SearchInfoForm from '../../components/search/searchInformationForm/SearchInfoForm';
import LoadSecurePage from '../../components/search/loading/LoadSecurePage';
import { GolfCourse } from '../../utils/api/types';

function Search() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [selectedCourse, setSelectedCourse] = useState<GolfCourse | null>(null);

  const handleCourseSelection = (course: GolfCourse): void => {
    setSelectedCourse(course);
  };

  const handleLoadingResult = (result: boolean, error?: Error): void => {
    if (!result) {
      // TODO
      console.log(error);
      navigate('/login');
    } else {
      setIsAuthenticated(true);
    }
  };

  if (isAuthenticated === null) {
    return (
      <div>
        <LoadSecurePage onLoad={handleLoadingResult} />
      </div>
    );
  }
  return (
    <div id="homePageContainer">
      <div id="courseSelectionContainer">
        <CourseSelect onCourseSelection={handleCourseSelection} />
        <div className="dividerLineDiv" />
        <SearchInfoForm course={selectedCourse} />
      </div>
    </div>
  );
}

export default Search;
