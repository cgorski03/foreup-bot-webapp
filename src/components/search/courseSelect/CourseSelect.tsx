import React from 'react';
import Select from 'react-select';
// @ts-ignore
import selectStyles from './selectStyles';
import CourseLabel from './CourseLabel';
import { GolfCourse, GolfCourseCollection } from '../../../utils/api/types';

type CourseSelectProps = {
  onCourseSelection: (course: GolfCourse) => void;
  golfCourseList: GolfCourseCollection | null;
};

type Option = {
  value: string;
  courseObj?: GolfCourse;
  label: JSX.Element;
};

function CourseSelect(props: CourseSelectProps) {
  const { onCourseSelection, golfCourseList } = props;
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
        onChange={(option: Option | null) => {
          if (option != null && option.courseObj) {
            onCourseSelection(option.courseObj);
          }
        }}
        placeholder="Where would you like to play?"
        maxMenuHeight={207.5}
      />
    </div>
  );
}

export default CourseSelect;
