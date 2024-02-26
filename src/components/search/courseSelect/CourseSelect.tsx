import React from 'react';
import Select from 'react-select';
// @ts-ignore
import selectStyles from './selectStyles';
import CourseLabel from './label/CourseLabel';
import { useGetCourses } from '../../../utils/api/requests';
import { GolfCourse } from '../../../utils/api/types';

type CourseSelectProps = {
  onCourseSelection: (course: GolfCourse) => void;
};

type Option = { value: string; courseObj: GolfCourse; label: JSX.Element };

function CourseSelect(props: CourseSelectProps) {
  const { onCourseSelection } = props;
  const { getCourses, coursesLoading, courses } = useGetCourses();

  if (coursesLoading) {
    return (
      <div>
        <Select
          isSearchable
          styles={selectStyles}
          placeholder="Where would you like to play?"
          maxMenuHeight={207.5}
        />
      </div>
    );
  }
  return (
    <div>
      <Select
        options={
          courses
            ? Object.values(courses).map((course) => ({
              value: course.courseName,
              courseObj: course,
              label: (
                <CourseLabel
                  courseName={course.courseName}
                  courseLocation={course.courseLocation}
                />
              ),
            }))
            : (getCourses(), [])
        }
        isSearchable
        styles={selectStyles}
        onChange={(option: Option | null) => {
          if (option != null) {
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
