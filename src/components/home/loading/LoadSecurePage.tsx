import React, { useContext, useEffect, useState } from "react";
import { TailSpin } from "react-loader-spinner";
import { UserInformationContext } from "../../../Contexts/UserContext";
import useAuth from "../../../utils/hooks/useAuth";
import { fetchUserAttributes } from "aws-amplify/auth";
import { getIdToken } from "../../../utils/authFunctions/getIdToken";

type LoadSecurePageProps = {
  onLoad: (result: boolean) => void;
};
export const LoadSecurePage = (props: LoadSecurePageProps) => {
  const { onLoad } = props;
  const isAuthenticated = useAuth();
  const { setUserInfo } = useContext(UserInformationContext);

  async function setUserContext(): Promise<boolean> {
    try {
      const userAttributes = await fetchUserAttributes();
      setUserInfo &&
        setUserInfo({
          name: userAttributes.name,
          email: userAttributes.email,
          email_verified: userAttributes.email_verified,
          id_token: await getIdToken(),
        });
      return true;
    } catch (error) {
      return false;
    }
  }

  useEffect(() => {
    if (isAuthenticated === false) {
      onLoad(false);
    }
    if (isAuthenticated) {
      setUserContext().then((success) => onLoad(success));
    }
  }, [isAuthenticated, onLoad]);
  return (
    <div>
      <TailSpin color="white" width="40" wrapperClass="mainLoginPageLoader" />
    </div>
  );
};
