import React, { useState, useEffect } from 'react';
import './searchStyles.css';
import CourseSelect from '../../components/search/courseSelect/CourseSelect';
import SearchInfoForm from '../../components/search/searchInformationForm/SearchInfoForm';
import { GolfCourse } from '../../utils/api/types';
import { useGetCourses } from '../../utils/api/requests';
import CourseInformationCard from '../../components/search/SeelctedCourseInformation/CourseInformationCard';

function Search() {
  const [selectedCourse, setSelectedCourse] = useState<GolfCourse | null>(null);
  const { getCourses, courses } = useGetCourses();
  const userFavorites: number[] = [21372431, 125199369, 122392149];
  useEffect(() => {
    getCourses();
  }, []);

  return (
    <div id="homePageContainer">
      <div className="featuredCoursesBanner">
        <CourseInformationCard
          isSelected={selectedCourse === null}
          // Display the second favorite course
          displayedCourse={courses ? courses[userFavorites[1]] : null}
          setSelectedCourse={setSelectedCourse}
        />
        <CourseInformationCard
          isSelected
          // If selectedCourse is null, display the first favorite course
          displayedCourse={selectedCourse || (courses && courses[userFavorites[0]])}
          setSelectedCourse={setSelectedCourse}
        />
        <CourseInformationCard
          isSelected={selectedCourse === null}
          // Display the third favorite course
          displayedCourse={courses ? courses[userFavorites[2]] : null}
          setSelectedCourse={setSelectedCourse}
        />
      </div>
      <div className="teeSearchFormContainer">
        <CourseSelect
          selectedCourse={selectedCourse}
          setSelectedCourse={setSelectedCourse}
          golfCourseList={courses}
        />
        <SearchInfoForm course={selectedCourse} />
      </div>
    </div>
  );
}

export default Search;
