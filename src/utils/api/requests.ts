import type { CreateSearchInput, GolfCourseCollection, UserSearchInfo, DeleteSearchInput, VerificationCode } from './types';
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
    setData: setSearches,
    responseCode } = useFetch<UserSearchInfo[]>(
    {
      endpoint: '/search',
      method: 'GET',
    },
  );

  const getSearches = (input?: undefined) => commonFetch({ input });

  const forceSearches = (input?: undefined) => commonFetch({ input, cacheOverride: true });

  return { getSearches, forceSearches, searchesLoading, searches, setSearches, responseCode };
};

export const useCreateSearch = () => {
  const { commonFetch, isLoading, data, responseCode } = useFetch<string>({
    endpoint: '/search',
    method: 'POST',
  });
  const createSearch = (input: CreateSearchInput) => commonFetch({ input });

  return { createSearch, isLoading, data, responseCode };
};

export const useDeleteSearch = () => {
  const { commonFetch,
    isLoading: deleteLoading,
    data: updatedSeaches,
    responseCode: deleteResponse } = useFetch<UserSearchInfo[]>({
    endpoint: '/search',
    method: 'DELETE',
  });
  const deleteSearch = (input: DeleteSearchInput) => commonFetch({ input });

  return { deleteSearch, deleteLoading, updatedSeaches, deleteResponse };
};

export const useCancelSearch = () => {
  const { commonFetch, isLoading:
  cancelLoading,
  data: cancelledSearches,
  responseCode: cancelResponse } = useFetch<UserSearchInfo[]>({
    endpoint: '/search',
    method: 'PUT',
  });
  const cancelSearch = (input: DeleteSearchInput) => commonFetch({ input });

  return { cancelSearch, cancelLoading, cancelledSearches, cancelResponse };
};

export const useTestMessage = () => {
  const { commonFetch, isLoading: testMessageLoading, responseCode } = useFetch<string>({
    endpoint: '/notify',
    method: 'GET',
  });
  const sendTestMessage = (input?: undefined) => commonFetch({ input, cacheOverride: true });

  return { sendTestMessage, testMessageLoading, responseCode };
};

export const useCreateVerificationCode = () => {
  const { commonFetch,
    isLoading: testMessageLoading,
    responseCode,
    data: verificationCode } = useFetch<VerificationCode>({
    endpoint: '/notify',
    method: 'POST',
  });
  const sendTestMessage = (input?: undefined) => commonFetch({ input });

  return { sendTestMessage, testMessageLoading, responseCode, verificationCode };
};
