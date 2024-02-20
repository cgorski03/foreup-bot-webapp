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
  const dateObject = new Date(options.date + (options.time ? 'Z' : ' '));
  const formattedDate = dateObject.toLocaleString('en-US', {
    ...(options.dayOfWeek ? { weekday: 'long' } : {}),
    ...(options.time
      ? { hour: 'numeric', minute: 'numeric', hour12: true }
      : {}),
    month: 'long',
    day: 'numeric',
  });
  const formattedDateWithSuffix = formattedDate.replace(/\d+/, (day) => getOrdinalSuffix(parseInt(day, 10)));
  // remove the at in the date object that is returned
  return formattedDateWithSuffix.replace(' at', '');
}

export function getElapsedTime(lastActive: string): string {
  const currentDate: Date = new Date();
  const inputDate: Date = new Date(`${lastActive}Z`);

  const timeDifference = currentDate.getTime() - inputDate.getTime();

  const minutes: number = Math.floor(timeDifference / 60000); // 1 minute = 60,000 milliseconds

  return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`;
}

export function convertTo12Hour(time24: string): string {
  const [hours, minutes] = time24.split(':');
  let period = 'AM';

  let hours12 = parseInt(hours, 10);

  if (hours12 >= 12) {
    period = 'PM';
    if (hours12 > 12) {
      hours12 -= 12;
    }
  }

  return `${hours12}:${minutes} ${period}`;
}
