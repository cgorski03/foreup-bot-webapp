import React from 'react'
import './loginStyles.css'

const passwordField = ( { onChange} ) => {
  
  const handleUserInput = (event) => {
    //callback to parent function
    onChange(event.target.value)
  }
  return (
      <input
      type="password"
      className="loginField"
      id="passwordBox" 
      placeholder="Password"
      onChange={handleUserInput}
    />
    );
};

export default passwordField;