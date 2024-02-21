import { CreateSearchInput, GolfCourseCollection, UserSearchInfo } from './types';
import useFetch from './useFetch';

export const useGetCourses = () => {
  const { commonFetch,
    isLoading: coursesLoading,
    data: courses,
    responseCode } = useFetch<GolfCourseCollection>({
    endpoint: '/courses',
    method: 'GET',
  });

  const getCourses = (input?: undefined) => commonFetch({ input });

  return { getCourses, coursesLoading, courses, responseCode };
};

export const useGetSearches = () => {
  const { commonFetch,
    isLoading: searchesLoading,
    data: searches,
    responseCode } = useFetch<UserSearchInfo[]>(
    {
      endpoint: '/search',
      method: 'GET',
    },
  );

  const getSearches = (input?: undefined) => commonFetch({ input });

  const forceSearches = (input?: undefined) => commonFetch({ input, cacheOverride: true });

  return { getSearches, forceSearches, searchesLoading, searches, responseCode };
};

export const useCreateSearch = () => {
  const { commonFetch, isLoading, data, responseCode } = useFetch<string>({
    endpoint: '/search',
    method: 'POST',
  });
  const createSearch = (input: CreateSearchInput) => commonFetch({ input });

  return { createSearch, isLoading, data, responseCode };
};
