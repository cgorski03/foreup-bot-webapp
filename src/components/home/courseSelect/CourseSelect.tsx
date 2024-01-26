import React from "react";
import Select from "react-select";
//i cannot figure out how to make this stupid stylesheet typescript
//@ts-ignore
import selectStyles from "./selectStyles";
import CourseLabel from "./label/CourseLabel";
type CourseSelectProps = {
  onCourseSelection: (selectedOption: string) => void;
};

type Option = { value: string; label: JSX.Element };

const options: Option[] = [
  {
    value: "H. Smith Richardson Golf Course",
    label: (
      <CourseLabel
        courseName="H. Smith Richardson Golf Course"
        courseLocation="Fairfield, CT"
      />
    ),
  },
  {
    value: "Bethpage Black Golf Course",
    label: (
      <CourseLabel
        courseName="Bethpage Black Golf Course"
        courseLocation="Farmingdale, NY"
      />
    ),
  },
  {
    value: "Bethpage Blue Golf Course",
    label: (
      <CourseLabel
        courseName="Bethpage Blue Golf Course"
        courseLocation="Farmingdale, NY"
      />
    ),
  },
  {
    value: "Westchase Golf Club",
    label: (
      <CourseLabel
        courseName="Westchase Golf Club"
        courseLocation="Tampa, FL"
      />
    ),
  },
  {
    value: "Mangrove Bay Golf Course",
    label: (
      <CourseLabel
        courseName="Mangrove Bay Golf Course"
        courseLocation="St. Petersburg, FL"
      />
    ),
  },
];

const CourseSelect = (props: CourseSelectProps) => {
  //sample hard-coded data that will eventually be an api request and a for loop
  // these should be interfaced
  const { onCourseSelection } = props;

  return (
    <div>
      <Select
        options={options}
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
