import { signOut } from "aws-amplify/auth";

export async function handleSignOut() {
  try {
    await signOut();
    console.log("code is running")
    
  } catch (error) {
    console.log("error signing out:", error);
  }
}