import { fetchUserAttributes } from "aws-amplify/auth";
import { UserInformation } from "../../Contexts/UserContext";

export async function getUserObject(): Promise<UserInformation> {
  try {
    const userAttributes = await fetchUserAttributes();

    const userInformation: UserInformation = {
      name: userAttributes.name,
      email: userAttributes.email,
      email_verified: userAttributes.email_verified,
    };
    return userInformation;
    
  } catch (error) {
    return Promise.reject("Failed to fetch user information")
  }
};