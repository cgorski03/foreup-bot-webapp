import React, { useContext, useEffect } from 'react';
import { fetchUserAttributes } from 'aws-amplify/auth';
import { TailSpin } from 'react-loader-spinner';
import { UserInformationContext } from '../../../Contexts/UserContext';
import useAuth from '../../../utils/hooks/useAuth';
import getIdToken from '../../../utils/authFunctions/getIdToken';

type LoadSecurePageProps = {
  onLoad: (result: boolean, error?: Error) => void;
};
function LoadSecurePage(props: LoadSecurePageProps) {
  const { onLoad } = props;
  const isAuthenticated = useAuth();
  const { setUserInfo } = useContext(UserInformationContext);

  useEffect(() => {
    const setUserContext = async (): Promise<[boolean, Error?]> => {
      // Set the user context based on the user info from auth api
      try {
        const userAttributes = await fetchUserAttributes();
        setUserInfo({
          name: userAttributes.name,
          email: userAttributes.email,
          email_verified: userAttributes.email_verified,
          id_token: await getIdToken(),
        });
        return [true];
      } catch (error: any) {
        return [false, error];
      }
    };
    // isAuthenticated will be null before async op finishes so have to check against t/f
    if (isAuthenticated === false) {
      // The user is not authenticated ensure context is empty
      setUserInfo({
        name: undefined,
        email: undefined,
        email_verified: undefined,
        id_token: undefined,
      });
      onLoad(false);
      return;
    }

    if (isAuthenticated) {
      setUserContext().then(([success, error]) => onLoad(success, error));
    }
  }, [isAuthenticated, onLoad, setUserInfo]);

  return (
    <div>
      <TailSpin color="white" width="40" wrapperClass="mainLoginPageLoader" />
    </div>
  );
}

export default LoadSecurePage;
