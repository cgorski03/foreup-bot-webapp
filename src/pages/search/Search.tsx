import React, { useState, useEffect } from 'react';
import './searchStyles.css';
import CourseSelect from '../../components/search/courseSelect/CourseSelect';
import SearchInfoForm from '../../components/search/searchInformationForm/SearchInfoForm';
import { GolfCourse } from '../../utils/api/types';
import { useGetCourses } from '../../utils/api/requests';
import CourseInformationCard from '../../components/search/SeelctedCourseInformation/CourseInformationCard';
import useMediaQuery from '../../utils/hooks/useMediaQuery';

function Search() {
  const [selectedCourse, setSelectedCourse] = useState<GolfCourse | null>(null);
  const { getCourses, courses } = useGetCourses();
  const userFavorites: number[] = [21372431, 125199369, 122392149];

  useEffect(() => {
    getCourses();
  }, []);

  // Render the favorites section of the page
  // Logic is abstracted to this function to make the main return statement cleaner
  // Handles the conditions for different screen sizes
  const renderFavorites = () => {
    const showFullCoursesBanner = !useMediaQuery('(max-width: 1800px)');
    const showOneFavorite = !useMediaQuery('(max-width: 600px)');
    // If the screen is too small, don't render ANY favorites
    if (!showOneFavorite && !showFullCoursesBanner) {
      return <div className="featuredCoursesBanner" />;
    }
    // If the screen is big enough to render one favorite, render the first favorite
    if (showOneFavorite && !showFullCoursesBanner) {
      return (
        <div className="featuredCoursesBanner">
          <CourseInformationCard
            isSelected
            // If selectedCourse is null, display the first favorite course
            displayedCourse={selectedCourse || (courses && courses[userFavorites[0]])}
            setSelectedCourse={setSelectedCourse}
          />
        </div>
      );
    }
    // If the screen is big enough to render all favorites, render all favorites
    return (
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
    );
  };

  return (
    <div id="homePageContainer">
      {renderFavorites()}
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
