import { fetchAuthSession } from 'aws-amplify/auth';

async function getIdToken() : Promise <string | undefined> {
  try {
    const idToken = (await fetchAuthSession()).tokens?.idToken?.toString();
    if (!idToken) return undefined;
    return idToken;
  } catch (err) {
    return undefined;
  }
}

export default getIdToken;
