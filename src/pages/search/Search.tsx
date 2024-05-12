import React, { useState } from 'react';
import './searchStyles.css';
import CourseSelect from '../../components/search/courseSelect/CourseSelect';
import SearchInfoForm from '../../components/search/searchInformationForm/SearchInfoForm';
import { GolfCourse } from '../../utils/api/types';
import CourseInformationCard from '../../components/search/SeelctedCourseInformation/CourseInformationCard';

function Search() {
  const [selectedCourse, setSelectedCourse] = useState<GolfCourse | null>(null);

  const handleCourseSelection = (course: GolfCourse): void => {
    setSelectedCourse(course);
  };

  return (
    <div id="homePageContainer">
      <div className="featuredCoursesBanner">
        <CourseInformationCard
          isSelected={false}
          selectedCourse={selectedCourse}
        />
        <CourseInformationCard
          isSelected
          selectedCourse={selectedCourse}
        />
        <CourseInformationCard
          isSelected={false}
          selectedCourse={selectedCourse}
        />
      </div>
      <div className="teeSearchFormContainer">
        <CourseSelect onCourseSelection={handleCourseSelection} />
        <SearchInfoForm course={selectedCourse} />
      </div>
    </div>
  );
}

export default Search;
