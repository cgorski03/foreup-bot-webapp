import React, { useState, useEffect } from 'react';
import './searchStyles.css';
import CourseSelect from '../../components/search/courseSelect/CourseSelect';
import SearchInfoForm from '../../components/search/searchInformationForm/SearchInfoForm';
import { GolfCourse } from '../../utils/api/types';
import { useGetCourses, useGetHistory } from '../../utils/api/requests';
import CourseInformationCard from '../../components/search/SeelctedCourseInformation/CourseInformationCard';
import useMediaQuery from '../../utils/hooks/useMediaQuery';

function Search() {
  const [selectedCourse, setSelectedCourse] = useState<GolfCourse | null>(null);
  const { getCourses, courses } = useGetCourses();
  const { getHistory, history } = useGetHistory();
  const [userFavorites, setUserFavorites] = useState<number[] | null>(null);
  useEffect(() => {
    // Fetch the courses and user history when the page loads
    getCourses();
    getHistory();
  }, []);

  useEffect(() => {
    // First, sort the favorites by the value at each key
    // Convert the object to an array of key-value pairs
    const defaultFavorites: number[] = [21372431, 84366992, 1092649935];
    if (history === null) {
      setUserFavorites(defaultFavorites);
      return;
    }
    // Convert the object to an array of key-value pairs, casting keys to numbers
    const searchHistoryArray: [number, number][] = Object.entries(history).map(
      ([key, value]) => [Number(key), value],
    );

    // Sort the array in descending order based on the search count (value)
    searchHistoryArray.sort((a, b) => b[1] - a[1]);

    // Get the top three course IDs (keys)
    const topThreeCourseIds = searchHistoryArray.slice(0, 3).map(([courseId]) => courseId);
    const topThreeCourseIdsWithDefault =
      topThreeCourseIds.length === 3
        ? topThreeCourseIds
        : topThreeCourseIds.concat(defaultFavorites);
    setUserFavorites(topThreeCourseIdsWithDefault.slice(0, 3));
  }, [history]);
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
            displayedCourse={
              selectedCourse || (courses && userFavorites && courses[userFavorites[0]])
            }
            setSelectedCourse={setSelectedCourse}
            courseSearches={history && userFavorites ? history[userFavorites[1]] : 0}
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
          displayedCourse={courses && userFavorites ? courses[userFavorites[1]] : null}
          setSelectedCourse={setSelectedCourse}
          courseSearches={history && userFavorites ? history[userFavorites[1]] : 0}
        />
        <CourseInformationCard
          isSelected
          // If selectedCourse is null, display the first favorite course
          displayedCourse={
            selectedCourse || (courses && userFavorites && courses[userFavorites[0]])
          }
          setSelectedCourse={setSelectedCourse}
          courseSearches={history && userFavorites ? history[userFavorites[0]] : 0}
        />
        <CourseInformationCard
          isSelected={selectedCourse === null}
          // Display the third favorite course
          displayedCourse={courses && userFavorites ? courses[userFavorites[2]] : null}
          setSelectedCourse={setSelectedCourse}
          courseSearches={history && userFavorites ? history[userFavorites[2]] : 0}
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
