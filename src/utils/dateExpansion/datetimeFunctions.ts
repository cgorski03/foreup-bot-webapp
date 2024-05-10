function getOrdinalSuffix(day: number) {
  const suffixes = ['th', 'st', 'nd', 'rd'];
  const relevantDigits = day > 10 && day < 14 ? 0 : day % 10;
  return day + (suffixes[relevantDigits] || suffixes[0]);
}

export function expandDate(options: { date: string;
  dayOfWeek?: boolean;
  time?: boolean; }): string {
  // Check if the date string is in the "MM-DD-YYYY" format
  // This is only a problem on mobile because JS is terrible
  let formattedDateString = `${options.date}Z`;
  const mmddyyyyRegex = /^(\d{2})-(\d{2})-(\d{4})$/;
  const mmddyyyyMatch = options.date.match(mmddyyyyRegex);

  if (mmddyyyyMatch) {
    // Convert the "MM-DD-YYYY" format to a valid date string
    const [, month, day, year] = mmddyyyyMatch;
    formattedDateString = `${year}-${month}-${day}`;
  }

  const dateObject = new Date(formattedDateString);
  if (Number.isNaN(dateObject.getTime())) {
    // Handle invalid date string
    return 'Invalid Date, Tell Colin He is Dumb';
  }

  const formattedDate = dateObject.toLocaleString('en-US', {
    ...(options.dayOfWeek ? { weekday: 'long' } : {}),
    ...(options.time ? { hour: 'numeric', minute: 'numeric', hour12: true } : {}),
    month: 'long',
    day: 'numeric',
  });

  const formattedDateWithSuffix = formattedDate.replace(/\d+/, (day) => getOrdinalSuffix(parseInt(day, 10)));

  // Remove the "at" in the date object that is returned
  return formattedDateWithSuffix.replace(' at', '');
}

export function getElapsedTime(lastActive: string): string {
  const currentDate: Date = new Date();
  const inputDate: Date = new Date(`${lastActive}Z`);

  const timeDifference = currentDate.getTime() - inputDate.getTime();

  const minutes: number = Math.floor(timeDifference / 60000); // 1 minute = 60,000 milliseconds
  if (!minutes) {
    return 'Just now';
  }
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
