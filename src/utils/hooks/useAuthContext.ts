import { useContext, useState } from 'react';
import { fetchUserAttributes } from 'aws-amplify/auth';
import { UserInformationContext } from '../../Contexts/UserContext';
import getIdToken from '../authFunctions/getIdToken';

export default function useAuthContext() {
  // Create loading state variables
  const [authContextLoading, setAuthContextLoading] = useState<Boolean>(false);
  const [clearAuthContextLoading, setClearAuthContextLoading] = useState<Boolean>(false);
  // Get the user information context
  const { setUserInfo } = useContext(UserInformationContext);
  const setAuthedContext = async (): Promise<Boolean> => {
    setAuthContextLoading(true);
    try {
      const userAttributes = await fetchUserAttributes();
      // Check if the user has a channel id
      // This prevents an error if the user does has not setup discord yet
      let channelIdValue: string | undefined;
      if ('custom:channel_id' in userAttributes) {
        channelIdValue = userAttributes['custom:channel_id'];
      }
      setUserInfo({
        name: userAttributes.name,
        email: userAttributes.email,
        email_verified: userAttributes.email_verified,
        id_token: await getIdToken(),
        channel_id: channelIdValue,
      });
      return true;
    } catch (error: any) {
      return false;
    }
  };
  const clearAuthedContext = () => {
    setClearAuthContextLoading(true);
    try {
      setUserInfo({
        name: undefined,
        email: undefined,
        email_verified: undefined,
        id_token: undefined,
        channel_id: undefined,
      });
      return true;
    } catch (error: any) {
      return false;
    }
  };
  return { setAuthedContext, clearAuthedContext, authContextLoading, clearAuthContextLoading };
}
