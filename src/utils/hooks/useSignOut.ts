import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'aws-amplify/auth';
import { UserInformationContext } from '../../Contexts/UserContext';

export default function useSignOut() {
  const [signingOut, setSigningOut] = useState<boolean>(false);
  const { setUserInfo } = useContext(UserInformationContext);
  const navigate = useNavigate();
  const logOut = async (): Promise<boolean> => {
    setSigningOut(true);
    try {
      await signOut();
      setUserInfo({
        name: undefined,
        email: undefined,
        email_verified: undefined,
        id_token: undefined,
      });
      navigate('/');
      return true;
    } catch (error) {
      setSigningOut(false);
      return false;
    }
  };
  return { logOut, signingOut };
}
