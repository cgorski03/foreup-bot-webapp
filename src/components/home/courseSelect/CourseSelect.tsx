import React, { useEffect, useState } from "react";
import Select from "react-select";
//@ts-ignore
import selectStyles from "./selectStyles";
import CourseLabel from "./label/CourseLabel";
import { useGetCourses } from "../../../utils/api/requests";
import { TailSpin } from "react-loader-spinner";

type CourseSelectProps = {
  onCourseSelection: (selectedOption: number, courseBookingDays: number) => void;
};

type Option = { value: number[]; label: JSX.Element };

const CourseSelect = (props: CourseSelectProps) => {
  const { onCourseSelection } = props;
  const { getCourses, isLoading, data } = useGetCourses();

  useEffect(() => {
    getCourses();
  }, []);

  if (isLoading) {
    return (
      <div>
        <TailSpin color="white" width="40" wrapperClass="mainLoginPageLoader" />
      </div>
    );
  }
  return (
    <div>
      <Select
        options={
          data
            ? data.map((course) => ({
                value: [course.course_id, course.maxBookingDays],
                label: (
                  <CourseLabel
                    courseName={course.courseName}
                    courseLocation={course.courseLocation}
                  />
                ),
              }))
            : ([] as Option[])
        }
        isSearchable={true}
        styles={selectStyles}
        onChange={(option: Option | null) => {
          if (option != null) {
            onCourseSelection(option.value[0], option.value[1]);
          }
        }}
        placeholder="Where would you like to play?"
        maxMenuHeight={207.5}
      />
    </div>
  );
};

export default CourseSelect;
