export type GolfCourse = {
  course_id: number;
  courseName: string;
  courseLocation: string;
  maxBookingDays: number;
  image: string;
  par: number;
  yardage: number;
  rating: number;
  slope: number;
};

export type GolfCourseCollection = Record<number, GolfCourse>;
// This is returned in a form of a courseid
// mapped to the number of searches a user has done on that course
export type UserSearchHistory = Record<number, number>;

export type CreateSearchInput = {
  course_id: number;
  courseName: string;
  date: string;
  players: number;
  startTime: string;
  endTime: string;
};

export type DeleteSearchInput = {
  search_id: string;
};

export type UserSearchInfo = {
  date: string;
  active: boolean;
  ID: string;
  players: number;
  courseName: string;
  start: string;
  end: string;
  searchInitiated: string;
  heartbeat: string;
  course_id: number;
  courseLink: string;
  times: string[][]
};

export type VerificationCode = {
  verification_code: string;
};
