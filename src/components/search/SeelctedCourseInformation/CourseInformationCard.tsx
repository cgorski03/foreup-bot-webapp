import React from 'react';
import { GolfCourse } from '../../../utils/api/types';
import './selectedCourseInformation.css';

type CourseInformationCardProps = {
  isSelected: boolean;
  selectedCourse: GolfCourse | null;
};

export default function CourseInformationCard(props: CourseInformationCardProps) {
  const { isSelected, selectedCourse } = props;
  return (
    <div
      className={`courseInformationCardContainer ${isSelected ? 'selectedCourseContainer' : 'notSelectedCourseContainer'}`}
    >
      <div className="course-details">
        <h2>{selectedCourse?.courseName}</h2>
        <p className="course-location">{selectedCourse?.courseLocation}</p>
        <p className="course-stats">
          Length: 7000yds | Par: 71 | Rating: 72.1 | Slope: 130
        </p>
      </div>
      <div className="course-image-container">
        <img
          src={selectedCourse?.image}
          alt={selectedCourse?.courseName}
        />
      </div>
    </div>
  );
}
