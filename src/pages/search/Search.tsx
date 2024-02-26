import React, { useState } from 'react';
import './searchStyles.css';
import CourseSelect from '../../components/search/courseSelect/CourseSelect';
import SearchInfoForm from '../../components/search/searchInformationForm/SearchInfoForm';
import { GolfCourse } from '../../utils/api/types';

function Search() {
  const [selectedCourse, setSelectedCourse] = useState<GolfCourse | null>(null);

  const handleCourseSelection = (course: GolfCourse): void => {
    setSelectedCourse(course);
  };

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
