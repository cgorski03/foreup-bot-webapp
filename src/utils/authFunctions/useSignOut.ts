import { signOut } from "aws-amplify/auth";
import { useContext } from "react";
import { UserInformationContext } from "../../Contexts/UserContext";
export function useSignOut() {
  const { setUserInfo } = useContext(UserInformationContext);
  const logOut = async ():Promise<boolean> => {
    try {
      await signOut();
      setUserInfo &&
        setUserInfo({
          name: undefined,
          email: undefined,
          email_verified: undefined,
          id_token: undefined,
        });
      window.location.reload();
      return true;
    } catch (error) {
      console.log("error signing out:", error);
      return false;
    }
  }
  return { logOut }
}
