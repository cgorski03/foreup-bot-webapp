import type { CreateSearchInput, GolfCourseCollection, UserSearchInfo, DeleteSearchInput, VerificationCode, UserSearchHistory } from './types';
import useFetch, { getEndpointUrl } from './useFetch';

export const useGetCourses = () => {
  const { commonFetch,
    isLoading: coursesLoading,
    data: courses,
    responseCode } = useFetch<GolfCourseCollection>({
    endpoint: '/courses',
    method: 'GET',
  });

  const getCourses = (input?: undefined) => commonFetch({ input });
  const refreshCourses = (input?: undefined) => commonFetch({ input, cacheOverride: true });
  return { getCourses, coursesLoading, courses, responseCode, refreshCourses };
};

export const useGetHistory = () => {
  const { commonFetch,
    isLoading: historyLoading,
    data: history,
    responseCode } = useFetch<UserSearchHistory>({
    endpoint: '/favorites',
    method: 'GET',
  });

  const getHistory = (input?: undefined) => commonFetch({ input });
  const refreshHistory = (input?: undefined) => commonFetch({ input, cacheOverride: true });
  return { getHistory, historyLoading, history, responseCode, refreshHistory };
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

  const updateCache = (updatedSearches: UserSearchInfo[]) => {
    sessionStorage.setItem(getEndpointUrl('/search'), JSON.stringify(updatedSearches));
  };

  return { getSearches,
    forceSearches,
    searchesLoading,
    searches,
    setSearches,
    responseCode,
    updateCache };
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
    isLoading: verificationCodeLoading,
    responseCode,
    data: verificationCode } = useFetch<VerificationCode>({
    endpoint: '/notify',
    method: 'POST',
  });
  const createVerificationCode = (input?: undefined) => commonFetch({ input });

  return { createVerificationCode, verificationCodeLoading, responseCode, verificationCode };
};
