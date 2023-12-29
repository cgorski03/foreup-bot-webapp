import './loginStyles.css'
import { ReactComponent as Loader } from './loader.svg'

const LoginButton = ( {onClick, loading} ) => {
  
  return (
    <button 
    className={`loginField ${loading ? "loading" : ""}`}
    id="loginActionButton"
    onClick={onClick}
    >{!loading ? "Login" : <Loader className="spinner" />}</button>
  );
};

export default LoginButton;