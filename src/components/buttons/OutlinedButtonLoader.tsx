import React from 'react';
import './loginStyles.css';
// @ts-ignore
import { ReactComponent as Loader } from '../login/inputFields/loader.svg';

type OutlinedButtonLoaderProps = {
  onClick: () => void;
  classOverride?: string;
  buttonText: string | React.JSX.Element;
  loading: boolean;
};
function OutlinedButtonLoader(props: OutlinedButtonLoaderProps) {
  const { onClick, classOverride, buttonText, loading } = props;

  return (
    <button
      type="button"
      className={`inputField ${loading ? 'loading' : ''} ${classOverride}`}
      onClick={onClick}
    >
      {!loading ? buttonText : <Loader className="spinner" />}
    </button>
  );
}

OutlinedButtonLoader.defaultProps = {
  classOverride: '',
};

export default OutlinedButtonLoader;
