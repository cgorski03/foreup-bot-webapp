import React from 'react';
import './loginStyles.css';
//@ts-ignore
import { ReactComponent as Loader } from '../login/inputFields/loader.svg';

type OutlinedButtonLoaderProps = {
  onClick: () => void;
  classOverride?: string;
  buttonText: string;
  loading: boolean;
};

export const OutlinedButtonLoader = (props: OutlinedButtonLoaderProps) => {
  const { onClick, classOverride, buttonText, loading } = props;

  return (
    <button
      className={`inputField ${loading ? 'loading' : ''} ${classOverride ? classOverride : ''}`}
      onClick={onClick}>
      {!loading ? buttonText : <Loader className="spinner" />}
    </button>
  );
};
