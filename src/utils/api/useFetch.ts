//Code simplified from https://dev.to/jeeny/how-to-create-an-api-layer-with-react-hooks-and-typescriptand-why-3a8o
import { useContext, useState } from "react";
import { UserInformationContext } from "../../Contexts/UserContext";



const BASE_URL = "https://dbpy4m4r63.execute-api.us-east-1.amazonaws.com/dev";

type UseFetchProps = {
  endpoint: string;
  method: "GET" | "POST" | "PUT" | "DELETE";
};

type CommonFetch = {
  //This is the body of the request
  input?: { [index: string]: any };
};

// <T> turns this into a generic component. We will take advantage of this
// by assigning the `data` variable the type T. If this doesn't make sense,
// it will when we get to the next file.
export function useFetch<T>({ endpoint, method }: UseFetchProps) {
  const DEFAULT_FETCH_HEADERS = {
    Authorization: useContext(UserInformationContext).userInfo?.id_token || "",
  };
  const [isLoading, setIsLoading] = useState(false);
  // we are assigning the generic type T to our data value here
  const [data, setData] = useState<T | null>(null);
  const commonFetch = async ({ input }: CommonFetch) => {
    setIsLoading(true);
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method,
      headers: {
        ...DEFAULT_FETCH_HEADERS,
      },
      body: JSON.stringify(input),
    });

    const data = await response.json();

    setIsLoading(false);
    setData(data);
  };

  return { isLoading, commonFetch, data};
}
