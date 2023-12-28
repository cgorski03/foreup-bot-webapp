import './loginStyles.css'

const LoginButton = ( {onClick} ) => {
  return (
    <button 
    className="loginField"
    id="loginActionButton"
    onClick={onClick}
    >Login</button>
  );
};

export default LoginButton;