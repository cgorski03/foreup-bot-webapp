import React, { ChangeEvent } from 'react';

type TextInputFieldProps = {
  onChange: (newPassword: string) => void;
  placeholder: string;
  loginPress: () => void;
};

function TextInputField(props: TextInputFieldProps) {
  const { onChange, placeholder, loginPress } = props;
  const handleEnterKey = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      loginPress();
    }
  };
  const handleUserInput = (event: ChangeEvent<HTMLInputElement>) => {
    // callback to parent function
    onChange(event.target.value);
  };
  return (
    <input
      type={placeholder === 'Password' ? 'password' : 'text'}
      className="inputField"
      placeholder={placeholder}
      onChange={handleUserInput}
      onKeyDown={handleEnterKey}
    />
  );
}

export default TextInputField;
