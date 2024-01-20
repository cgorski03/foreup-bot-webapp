import React, { ChangeEvent } from "react";
import "./loginStyles.css";

type PasswordFieldProps = {
  onChange: (newPassword: string) => void;
};

const passwordField = (props: PasswordFieldProps) => {
  const { onChange } = props;

  const handleUserInput = (event: ChangeEvent<HTMLInputElement>) => {
    //callback to parent function
    onChange(event.target.value);
  };
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
