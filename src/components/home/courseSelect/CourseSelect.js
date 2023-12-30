import Select from 'react-select'
import selectStyles  from './selectStyles';
const CourseSelect = () => {
  const options = [
      {
        value: "h_smith_richardson",
        label: (
          <div>
            <label>H. Smith Richardson Golf Course</label>
          </div>
        ),
      },
      {
        value: "bethpage_black",
        label: (
          <div>
            <label>Bethpage Black Golf Course</label>
          </div>
        ),
      },
      {
        value: "bethpage_blue",
        label: (
          <div>
            <label>Bethpage Blue Golf Course</label>
          </div>
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