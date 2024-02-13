import { CreateSearchInput, GolfCourse } from "./types";
import { useFetch } from "./useFetch";

export const useGetCourses = () => {
  const { commonFetch, isLoading, data, response } = useFetch<GolfCourse[]>({
    endpoint: "/courses",
    method: "GET",
  });

  const getCourses = (input?: undefined) => commonFetch({ input });
  
  return { getCourses, isLoading, data, response }
};

export const useCreateSearch = () => {
  const { commonFetch, isLoading, data, response } = useFetch<string>({
    endpoint: "/search",
    method: "POST",
  }) 
  const createSearch = (input: CreateSearchInput ) => commonFetch({ input });
  
  return { createSearch, isLoading, data, response }
}