import { CreateSearchInput, GolfCourse, UserSearchInfo } from './types';
import useFetch from './useFetch';

export const useGetCourses = () => {
  const { commonFetch, isLoading, data, responseCode } = useFetch<GolfCourse[]>({
    endpoint: '/courses',
    method: 'GET',
  });

  const getCourses = (input?: undefined) => commonFetch({ input });

  return { getCourses, isLoading, data, responseCode };
};

export const useGetSearches = () => {
  const { commonFetch, isLoading, data, responseCode } = useFetch<UserSearchInfo[]>(
    {
      endpoint: '/search',
      method: 'GET',
    },
  );

  const getSearches = (input?: undefined) => commonFetch({ input });

  const forceSearches = (input?: undefined) => commonFetch({ input, cacheOverride: true });

  return { getSearches, forceSearches, isLoading, data, responseCode };
};

export const useCreateSearch = () => {
  const { commonFetch, isLoading, data, responseCode } = useFetch<string>({
    endpoint: '/search',
    method: 'POST',
  });
  const createSearch = (input: CreateSearchInput) => commonFetch({ input });

  return { createSearch, isLoading, data, responseCode };
};
