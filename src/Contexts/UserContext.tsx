import { createContext } from "react";

export type UserInformation = {
  name: string | undefined;
  email: string | undefined;
  email_verified: string | undefined;
};
type UserContextType = {
  userInfo: UserInformation | null;
  setUserInfo: ((userInfo:UserInformation) => void) | null;
}
export const UserInformationContext = createContext<UserContextType>({
  userInfo:null,
  setUserInfo:null,
});
