import React from 'react';
// @ts-ignore
import { ReactComponent as Loader } from './spinner.svg';

type IconLabeledButtonProps = {
  icon: JSX.Element;
  loading: boolean;
  onClick: () => void;
};

function IconLabeledButton(props: IconLabeledButtonProps) {
  const { onClick, loading, icon } = props;
  return (
    <div>
      <button
        type="submit"
        onClick={onClick}
        className="iconLabeledButton"
      >
        {loading ? <Loader /> : icon}
      </button>
    </div>
  );
}

export default IconLabeledButton;
