import './loginStyles.css'

const UsernameField = ({ onChange }) => {
  
  const handleUserInput = (event) => {
    //callback to parent function
    onChange(event.target.value)
  }
  
  return (
      <input
      type="text"
      className="loginField" 
      id="usernameBox"
      placeholder="Username"
      onChange={handleUserInput}
    />
    );
};

export default UsernameField;