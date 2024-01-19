import React from 'react';
import './courseLabel.css';

type CourseLabelProps = {
  courseName: string;
  courseLocation: string;
}

const CourseLabel = ( props: CourseLabelProps ) => {
  const {courseName, courseLocation} = props;
  
  return (
    <div className="label">
        <div className="course-name">{courseName}</div>
        <div className="location">{courseLocation}</div>
    </div>
  )
}

export default CourseLabel