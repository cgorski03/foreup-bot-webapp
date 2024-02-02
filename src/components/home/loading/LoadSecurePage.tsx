import React, { useContext, useEffect } from "react";
import { TailSpin } from "react-loader-spinner";
import { UserInformationContext } from "../../../Contexts/UserContext";
import useAuth from "../../../utils/hooks/useAuth";
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
    const setUserContext = async (): Promise<[boolean, Error?]> => {
      try {
        const userAttributes = await fetchUserAttributes();
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
    //isAuthenticated will be null before async operation finishes so have to check against t/f
    if (isAuthenticated === false) {
      onLoad(false);
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
};
