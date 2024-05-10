import { useContext, useState } from 'react';
import { UserInformationContext } from '../../Contexts/UserContext';

const BASE_URL = 'https://dbpy4m4r63.execute-api.us-east-1.amazonaws.com/dev';

type UseFetchProps = {
  endpoint: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
};

type CommonFetch = {
  input?: { [index: string]: any };
  cacheOverride?: boolean;
};
export function getEndpointUrl(endpoint: string) {
  return `${BASE_URL}${endpoint}`;
}
function useFetch<T>({ endpoint, method }: UseFetchProps) {
  const DEFAULT_FETCH_HEADERS = {
    Authorization: useContext(UserInformationContext).userInfo?.id_token || '',
    'Content-Type': 'application/json',
  };
  const [isLoading, setIsLoading] = useState(false);
  // we are assigning the generic type T to our data value here
  const [data, setData] = useState<T | null>(null);
  const [responseCode, setResponseCode] = useState<number | null>(null);

  const commonFetch = async ({ input, cacheOverride }: CommonFetch) => {
    const endpointUrl: string = `${BASE_URL}${endpoint}`;
    setIsLoading(true);
    // Check if the data is already in the session storage and that this is not a forced refresh
    if (
      method === 'GET'
      && sessionStorage.getItem(endpointUrl)
      && !cacheOverride
    ) {
      // If yes, set data to the value
      const cachedData = sessionStorage.getItem(endpointUrl);
      // This has to be ugly because linter isn't recognizing initial conditional
      if (cachedData) {
        setData(JSON.parse(cachedData));
        setResponseCode(200);
        setIsLoading(false);
      }
    } else {
      // Else, fetch
      const response = await fetch(endpointUrl, {
        method,
        headers: {
          ...DEFAULT_FETCH_HEADERS,
        },
        body: JSON.stringify(input),
      });
      const responseData = await response.json();
      // Set the session storage
      if (method === 'GET' && response.ok) {
        sessionStorage.setItem(endpointUrl, JSON.stringify(responseData));
      }
      setIsLoading(false);
      setResponseCode(response.status);
      setData(responseData);
    }
  };

  return { isLoading, commonFetch, data, setData, responseCode };
}

export default useFetch;
