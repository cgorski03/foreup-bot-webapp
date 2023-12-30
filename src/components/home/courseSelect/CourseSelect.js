import Select from 'react-select'
import selectStyles  from './selectStyles';
import CourseLabel from './label/CourseLabel'

const CourseSelect = ({ onCourseSelection }) => {
  //sample hard-coded data that will eventually be an api request and a for loop
  const options = [
      {
        value: "H. Smith Richardson Golf Course",
        label: (
          <CourseLabel 
            courseName="H. Smith Richardson Golf Course"
            courseLocation="Fairfield, CT" />
        ),
      },
      {
        value: "Bethpage Black Golf Course",
        label: (
          <CourseLabel 
            courseName="Bethpage Black Golf Course"
            courseLocation="Farmingdale, NY" />
        ),
      },
      {
        value: "Bethpage Blue Golf Course",
        label: (
          <CourseLabel 
            courseName="Bethpage Blue Golf Course"
            courseLocation="Farmingdale, NY" />
            ),
          },
        ];   
        
  return (
      <div>
          <Select
          options={options}
          isSearchable={true}
          styles={selectStyles}
          onChange={onCourseSelection}
          placeholder="Where would you like to play?"
          />
          
      </div>
  )
}

export default CourseSelect