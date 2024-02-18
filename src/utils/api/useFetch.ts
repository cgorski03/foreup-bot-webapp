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

export function useFetch<T>({ endpoint, method }: UseFetchProps) {
  const DEFAULT_FETCH_HEADERS = {
    Authorization: useContext(UserInformationContext).userInfo?.id_token || '',
  };
  const [isLoading, setIsLoading] = useState(false);
  // we are assigning the generic type T to our data value here
  const [data, setData] = useState<T | null>(null);
  const [response, setResponse] = useState<number | null>(null);

  const commonFetch = async ({ input, cacheOverride }: CommonFetch) => {
    const endpointUrl: string = `${BASE_URL}${endpoint}`;
    setIsLoading(true);
    // Check if the data is already in the session storage and that this is not a forced refresh
    if (
      method === 'GET' &&
      sessionStorage.getItem(endpointUrl) &&
      !cacheOverride
    ) {
      // If yes, set data to the value
      const cachedData = sessionStorage.getItem(endpointUrl);
      cachedData && setData(JSON.parse(cachedData));
      setResponse(200);
      setIsLoading(false);
    } else {
      // Else, fetch
      const response = await fetch(endpointUrl, {
        method,
        headers: {
          ...DEFAULT_FETCH_HEADERS,
        },
        body: JSON.stringify(input),
      });
      const data = await response.json();
      // Set the session storage
      sessionStorage.setItem(endpointUrl, JSON.stringify(data));
      setIsLoading(false);
      setResponse(response.status);
      setData(data);
    }
  };

  return { isLoading, commonFetch, data, response };
}
