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
