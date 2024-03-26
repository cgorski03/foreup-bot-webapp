import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'aws-amplify/auth';
import useAuthContext from './useAuthContext';

export default function useSignOut() {
  const [signingOut, setSigningOut] = useState<boolean>(false);
  const { clearAuthedContext } = useAuthContext();
  const navigate = useNavigate();
  const logOut = async (): Promise<boolean> => {
    setSigningOut(true);
    try {
      await signOut();
      await clearAuthedContext();
      navigate('/');
      return true;
    } catch (error) {
      setSigningOut(false);
      return false;
    }
  };
  return { logOut, signingOut };
}
