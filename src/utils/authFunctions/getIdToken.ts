import { fetchAuthSession } from 'aws-amplify/auth'
export async function getIdToken() : Promise <string | undefined> {
  try { 
    const idToken = (await fetchAuthSession()).tokens?.idToken?.toString();
    return idToken? idToken : undefined;
  } catch(err) { 
    return undefined;
  }
}