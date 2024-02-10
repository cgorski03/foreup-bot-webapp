import React, { useContext, useEffect } from "react";
import { TailSpin } from "react-loader-spinner";
import { UserInformationContext } from "../../../Contexts/UserContext";
import { useAuth } from "../../../utils/hooks/useAuth";
import { fetchUserAttributes } from "aws-amplify/auth";
import { getIdToken } from "../../../utils/authFunctions/getIdToken";
/**
 * LoadSecurePage Component
 *
 * This component is responsible for loading a secure page, fetching user attributes,
 * and setting user information in the context.
 *
 */

type LoadSecurePageProps = {
  onLoad: (result: boolean, error?: Error) => void;
};
export const LoadSecurePage = (props: LoadSecurePageProps) => {
  const { onLoad } = props;
  const isAuthenticated = useAuth();
  const { setUserInfo } = useContext(UserInformationContext);

  useEffect(() => {
    //isAuthenticated will be null before async op finishes so have to check against t/f
    if (isAuthenticated === false) {
      // The user is not authenticated setting context is not needed
      onLoad(false);
      return;
    }

    const setUserContext = async (): Promise<[boolean, Error?]> => {
      //Set the user context based on the user info from auth api
      try {
        const userAttributes = await fetchUserAttributes(); 
        console.log(userAttributes);
        setUserInfo &&
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
    if (isAuthenticated) {
      setUserContext().then(([success, error]) => onLoad(true, error));
    }
  }, [isAuthenticated, onLoad, setUserInfo]);

  return (
    <div>
      <TailSpin color="white" width="40" wrapperClass="mainLoginPageLoader" />
    </div>
  );
};
