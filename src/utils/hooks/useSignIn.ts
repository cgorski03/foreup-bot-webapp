import { useContext, useState } from 'react';
import { fetchUserAttributes } from 'aws-amplify/auth';
import { UserInformationContext } from '../../Contexts/UserContext';
import getIdToken from '../authFunctions/getIdToken';

export default function useSignIn() {
  const [contextLoading, setContextLoading] = useState<Boolean>(false);
  const { setUserInfo } = useContext(UserInformationContext);
  const setAuthedContext = async (): Promise<Boolean> => {
    setContextLoading(true);
    try {
      const userAttributes = await fetchUserAttributes();
      setUserInfo({
        name: userAttributes.name,
        email: userAttributes.email,
        email_verified: userAttributes.email_verified,
        id_token: await getIdToken(),
      });
      return true;
    } catch (error: any) {
      return false;
    }
  };
  return { setAuthedContext, contextLoading };
}
