import './courseLabel.css';

const CourseLabel = ( {courseName, courseLocation} ) => {
  return (
    <div className="label">
        <div className="course-name">{courseName}</div>
        <div className="location">{courseLocation}</div>
    </div>
  )
}

export default CourseLabel