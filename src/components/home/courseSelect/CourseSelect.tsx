import React, { useState } from "react";
import Select from "react-select";
//@ts-ignore
import selectStyles from "./selectStyles";
import CourseLabel from "./label/CourseLabel";
import { useGetCourses } from "../../../utils/api/requests";
import { TailSpin } from "react-loader-spinner";
import { GolfCourse } from "../../../utils/api/types";
type CourseSelectProps = {
  onCourseSelection: (course: GolfCourse) => void;
};

type Option = { value: GolfCourse; label: JSX.Element };

const CourseSelect = (props: CourseSelectProps) => {
  const { onCourseSelection } = props;
  const { getCourses, isLoading, data } = useGetCourses();

  if (isLoading) {
    return (
      <div>
        <TailSpin color="white" width="40" />
      </div>
    );
  }
  return (
    <div>
      <Select
        options={
          data
            ? data.map((course) => ({
                value: course,
                label: (
                  <CourseLabel
                    courseName={course.courseName}
                    courseLocation={course.courseLocation}
                  />
                ),
              }))
            : (getCourses(), [])
        }
        isSearchable={true}
        styles={selectStyles}
        onChange={(option: Option | null) => {
          if (option != null) {
            onCourseSelection(option.value);
          }
        }}
        placeholder="Where would you like to play?"
        maxMenuHeight={207.5}
      />
    </div>
  );
};

export default CourseSelect;
