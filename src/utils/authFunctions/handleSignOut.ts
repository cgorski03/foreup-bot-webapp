import { signOut } from "aws-amplify/auth";

async function handleSignout() {
  try {
    await signOut();
  } catch (error) {
    console.log("error signing out:", error);
  }
}

export default handleSignout;
