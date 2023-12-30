import Select from 'react-select'
import CourseLabel from './label/CourseLabel'
import selectStyles  from './selectStyles';
const CourseSelect = () => {
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
          placeholder="Type your course here..."
          />
          
      </div>
  )
}

export default CourseSelect