import "./loginStyles.css";
import React, { ChangeEvent } from "react";

type UsernameFieldProps = {
  onChange: (newUsername: string) => void;
};

const UsernameField = (props: UsernameFieldProps) => {
  const { onChange } = props;
  const handleUserInput = (event: ChangeEvent<HTMLInputElement>) => {
    //callback to parent function
    onChange(event.target.value);
  };

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
