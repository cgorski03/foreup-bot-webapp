import React, { ChangeEvent } from 'react';

type TextInputFieldProps = {
  setInput: (input: string) => void;
  placeholder: string;
  loginPress: () => void;
};

function TextInputField(props: TextInputFieldProps) {
  const { setInput, placeholder, loginPress } = props;
  const handleEnterKey = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      loginPress();
    }
  };
  const handleUserInput = (event: ChangeEvent<HTMLInputElement>) => {
    // callback to parent function
    setInput(event.target.value);
  };
  return (
    <input
      type={
        placeholder === 'Password' || placeholder === 'Confirm Password'
          ? 'password'
          : 'text'
      }
      className="inputField"
      placeholder={placeholder}
      onChange={handleUserInput}
      onKeyDown={handleEnterKey}
    />
  );
}

export default TextInputField;
