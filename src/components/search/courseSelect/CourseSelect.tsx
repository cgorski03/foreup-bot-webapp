import React, { useEffect } from 'react';
import Select from 'react-select';
// @ts-ignore
import selectStyles from './selectStyles';
import CourseLabel from './CourseLabel';
import { useGetCourses } from '../../../utils/api/requests';
import { GolfCourse } from '../../../utils/api/types';
import HandleAuthApiErrors from '../../error/HandleFetchErrors';

type CourseSelectProps = {
  onCourseSelection: (course: GolfCourse) => void;
};

type Option = {
  value: string;
  courseObj?: GolfCourse;
  label: JSX.Element;
};

function CourseSelect(props: CourseSelectProps) {
  const { onCourseSelection } = props;
  const { getCourses, coursesLoading, courses, responseCode } = useGetCourses();
  useEffect(() => {
    // Get the courses on the first mounting of the component
    getCourses();
  }, []);

  const renderCourses = () => {
    if (!courses) {
      return [];
    }
    if (responseCode !== 200) {
      return [];
    }
    return Object.values(courses).map((course) => ({
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
  if (coursesLoading || !courses || (responseCode && responseCode !== 200)) {
    if (responseCode) {
      console.log(`response code ${responseCode}`);
      return <HandleAuthApiErrors responseCode={responseCode} />;
    }
    return (
      <div>
        <Select
          isSearchable
          styles={selectStyles}
          placeholder="Loading courses..."
          maxMenuHeight={207.5}
        />
      </div>
    );
  }
  return (
    <div>
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
