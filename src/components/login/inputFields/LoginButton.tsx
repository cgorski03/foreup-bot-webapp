import "./loginStyles.css";
import React from "react";
//@ts-ignore
import { ReactComponent as Loader } from "./loader.svg";

type LoginButtonProps = {
  onClick: () => void;
  loading: boolean;
};

const LoginButton = (props: LoginButtonProps) => {
  const { onClick, loading } = props;

  return (
    <button
      className={`loginField ${loading ? "loading" : ""}`}
      id="loginActionButton"
      onClick={onClick}>
      {!loading ? "Login" : <Loader className="spinner" />}
    </button>
  );
};

export default LoginButton;
