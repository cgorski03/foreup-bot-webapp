import { signOut } from "aws-amplify/auth";
import { useContext } from "react";
import { UserInformationContext } from "../../Contexts/UserContext";
export async function useSignOut(): Promise<boolean> {
  const { setUserInfo } = useContext(UserInformationContext);
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
