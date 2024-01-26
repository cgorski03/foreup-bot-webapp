// from https://docs.amplify.aws/react/build-a-backend/auth/enable-sign-up/
import { signIn, type SignInInput } from "aws-amplify/auth";

async function handleSignIn({ username, password }: SignInInput) {
  try {
    const { isSignedIn, nextStep } = await signIn({ username, password });
  } catch (error) {
    console.log("error signing in", error);
  }
}
