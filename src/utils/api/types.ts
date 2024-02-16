export type GolfCourse = {
  course_id: number;
  courseName: string;
  courseLocation: string;
  maxBookingDays: number;
};

export type CreateSearchInput = {
  course_id: number;
  courseName: string;
  date: string;
  players: number;
  startTime: string;
  endTime: string;
};

export type UserSearchInfo = {
  active: boolean;
  search_id: string;
  courseName: string;
  date: string;
  players: number;
  startTime: string;
  endTime: string;
  runTime: string;
};
