export type GolfCourse = {
  course_id: number;
  courseName: string;
  courseLocation: string;
  maxBookingDays: number;
  image: string;
};

export type GolfCourseCollection = Record<number, GolfCourse>;

export type CreateSearchInput = {
  course_id: number;
  courseName: string;
  date: string;
  players: number;
  startTime: string;
  endTime: string;
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
};
