import { createContext } from 'react';

export type UserInformation = {
  name: string | undefined;
  email: string | undefined;
  email_verified: string | undefined;
  id_token: string | undefined;
  channel_id: string | undefined;
};
type UserContextType = {
  userInfo: UserInformation | null;
  setUserInfo: (userInfo: UserInformation) => void;
};
export const UserInformationContext = createContext<UserContextType>({
  userInfo: null,
  setUserInfo: () => {},
});
