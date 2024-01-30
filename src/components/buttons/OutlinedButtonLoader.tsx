import React from "react";
import "./loginStyles.css"
//@ts-ignore
import { ReactComponent as Loader } from "../login/inputFields/loader.svg"

type LoginButtonProps = {
  onClick: () => void;
  classOverride?: string;
  buttonText: string;
  loading: boolean;
};

const LoginButton = (props: LoginButtonProps) => {
  const { onClick, classOverride, buttonText, loading } = props;

  return (
    <button
      className={`loginField ${loading ? "loading" : ""} ${classOverride ? classOverride: ""}`}
      id="loginActionButton"
      onClick={onClick}>
      {!loading ? buttonText : <Loader className="spinner" />}
    </button>
  );
};

export default LoginButton;
