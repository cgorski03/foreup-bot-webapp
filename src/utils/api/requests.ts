import { GolfCourse } from "./types";
import { useFetch } from "./useFetch";
export const useGetCourses = () => {
  const { commonFetch, isLoading, data, responseCode } = useFetch<GolfCourse[]>({
    endpoint: "/courses",
    method: "GET",
  });

  const getCourses = (input?: undefined) => commonFetch({ input });
  
  return { getCourses, isLoading, data, responseCode }
};