import { useContext, useState } from 'react';
import { signOut } from 'aws-amplify/auth';
import { UserInformationContext } from '../../Contexts/UserContext';

export default function useSignOut() {
  const [signingOut, setSigningOut] = useState<boolean>(false);
  const { setUserInfo } = useContext(UserInformationContext);

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
      window.location.reload();
      return true;
    } catch (error) {
      setSigningOut(false);
      return false;
    }
  };
  return { logOut, signingOut };
}
