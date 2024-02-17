function getOrdinalSuffix(day: number) {
  const suffixes = ['th', 'st', 'nd', 'rd'];
  const relevantDigits = day > 10 && day < 14 ? 0 : day % 10;
  return day + (suffixes[relevantDigits] || suffixes[0]);
}
export function expandDate(options: {
  date: string;
  dayOfWeek?: boolean;
  time?: boolean;
}): string {
  const dateObject = new Date(options.date);

  const dayOfWeekOptions: Intl.DateTimeFormatOptions = options.dayOfWeek
    ? { weekday: 'long' }
    : {};

  const timeOptions: Intl.DateTimeFormatOptions = options.time
    ? { hour: 'numeric', minute: 'numeric', hour12: true }
    : {};

  const formattedDate = dateObject.toLocaleString('en-US', {
    ...dayOfWeekOptions,
    ...timeOptions,
    month: 'long',
    day: 'numeric',
  });
  const formattedDateWithSuffix = formattedDate.replace(/\d+/, (day) =>
    getOrdinalSuffix(parseInt(day, 10))
  );
  // remove the at in the date object that is returned
  return formattedDateWithSuffix.replace(' at', '');
}
export function getElapsedTime(date: string): string {
  return '2 minutes ago';
}
