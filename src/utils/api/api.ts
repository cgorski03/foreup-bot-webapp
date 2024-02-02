import { useGetCourses } from "./requests";

export const useCoursesApi = () => {
  const {
    getCourses,
    isLoading: getCoursesLoading,
    data: getCoursesData,
  } = useGetCourses();


  return {
    getCourses: {
      query: getCourses,
      isLoading: getCoursesLoading,
      data: getCoursesData,
    },
  };
};