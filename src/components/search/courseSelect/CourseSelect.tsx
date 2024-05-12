import React from 'react';
import Select from 'react-select';
// @ts-ignore
import selectStyles from './selectStyles';
import CourseLabel from './CourseLabel';
import { GolfCourse, GolfCourseCollection } from '../../../utils/api/types';

type CourseSelectProps = {
  selectedCourse: GolfCourse | null;
  setSelectedCourse: (course: GolfCourse | null) => void;
  golfCourseList: GolfCourseCollection | null;
};

type Option = {
  value: string;
  courseObj?: GolfCourse;
  label: JSX.Element;
};

function CourseSelect(props: CourseSelectProps) {
  const { selectedCourse, setSelectedCourse, golfCourseList } = props;
  const getOptionFromCourse = (course: GolfCourse | null): Option | null => {
    if (!course) {
      return null;
    }
    return {
      value: course.courseName,
      courseObj: course,
      label: (
        <CourseLabel
          courseName={course.courseName}
          courseLocation={course.courseLocation}
        />
      ),
    };
  };

  const renderCourses = () => {
    if (!golfCourseList) {
      return [];
    }
    return Object.values(golfCourseList).map((course) => ({
      value: course.courseName,
      courseObj: course,
      label: (
        <CourseLabel
          courseName={course.courseName}
          courseLocation={course.courseLocation}
        />
      ),
    }));
  };
  // Check if the courses list is null
  if (golfCourseList === null) {
    // TODO make an animation of a flashing while it is loading
    return <div className="courseSelectWrapper courseSelectLoading" />;
  }
  // The couse list is not null
  return (
    <div className="courseSelectWrapper">
      <Select
        options={renderCourses()}
        isSearchable
        styles={selectStyles}
        value={getOptionFromCourse(selectedCourse)}
        onChange={(option: Option | null) => {
          setSelectedCourse(option?.courseObj || null);
        }}
        placeholder="Where would you like to play?"
        maxMenuHeight={207.5}
      />
    </div>
  );
}

export default CourseSelect;
