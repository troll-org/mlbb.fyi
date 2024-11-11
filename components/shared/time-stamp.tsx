interface TimeStampProps {
  date: string[];
  time: string[];
}

function countLeapYears(year: number, month: number) {
  let adjustedYear = year;
  if (month <= 2) adjustedYear--;
  return (
    Math.floor(adjustedYear / 4) -
    Math.floor(adjustedYear / 100) +
    Math.floor(adjustedYear / 400)
  );
}

function calculateDateDifference(date: string[], currDate: string[]) {
  const monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  const getTotalDays = (d: string[]) => {
    let days = Number(d[2]) + Number(d[0]) * 365;
    for (let i = 0; i < Number(d[1]) - 1; i++) days += monthDays[i];
    return days + countLeapYears(Number(d[0]), Number(d[1]));
  };
  return getTotalDays(currDate) - getTotalDays(date);
}

function calculateTimeDifference(
  startHour: string,
  endHour: string,
  startMinute: string,
  endMinute: string
) {
  let hoursDiff = Number(endHour) - Number(startHour);
  let minutesDiff = Number(endMinute) - Number(startMinute);

  if (minutesDiff < 0) {
    minutesDiff += 60;
    hoursDiff -= 1;
  }

  return [hoursDiff, minutesDiff];
}

function adjustDateByDays(date: string[], days: number) {
  const [year, month, day] = date.map(Number);
  const newDate = new Date(year, month - 1, day + days);
  return [
    newDate.getFullYear().toString(),
    (newDate.getMonth() + 1).toString(),
    newDate.getDate().toString(),
  ];
}

function handleTimeZoneAdjustment(time: string[], timezoneOffset: string) {
  const offsetHours = Number(timezoneOffset.slice(1)) / 100;
  const adjustedHour = timezoneOffset.startsWith("+")
    ? Number(time[0]) + offsetHours
    : Number(time[0]) - offsetHours;

  const newHour = adjustedHour < 0 ? adjustedHour + 24 : adjustedHour % 24;
  const dayChange =
    adjustedHour >= 24 ? "+" : adjustedHour < 0 ? "-" : "no change";

  return [String(newHour), dayChange];
}

const TimeStamp: React.FC<TimeStampProps> = ({ date, time }) => {
  const currentDate = new Date();
  const currDate = [
    currentDate.getFullYear().toString(),
    (currentDate.getMonth() + 1).toString(),
    currentDate.getDate().toString(),
  ];
  const currTime = [
    currentDate.getHours().toString(),
    currentDate.getMinutes().toString(),
  ];
  const timezoneOffset = currentDate.toTimeString().split(" ")[1];

  const [adjustedHour, dayChange] = handleTimeZoneAdjustment(
    time,
    timezoneOffset
  );
  time[0] = adjustedHour;
  if (dayChange === "+") date = adjustDateByDays(date, 1);
  else if (dayChange === "-") date = adjustDateByDays(date, -1);

  const dayDiff = calculateDateDifference(date, currDate);

  if (dayDiff === 0) {
    const [hoursAgo, minutesAgo] = calculateTimeDifference(
      time[0],
      currTime[0],
      time[1],
      currTime[1]
    );
    return (
      <div>
        <p className="text-xs mt-2 truncate leading-5 text-gray-500 ease-in-out">
          {hoursAgo > 0
            ? `${hoursAgo} ${hoursAgo === 1 ? "hour" : "hours"} ago`
            : minutesAgo > 0
            ? `${minutesAgo} ${minutesAgo === 1 ? "minute" : "minutes"} ago`
            : "Recently"}
        </p>
      </div>
    );
  }

  if (dayDiff === 1) {
    const hoursAgo = Number(currTime[0]) + 24 - Number(time[0]);
    return (
      <div>
        <p className="text-xs mt-2 truncate leading-5 text-gray-500 ease-in-out">
          {hoursAgo > 24
            ? "1 day ago"
            : `${hoursAgo} ${hoursAgo === 1 ? "hour" : "hours"} ago`}
        </p>
      </div>
    );
  }

  return (
    <div>
      <p className="text-xs mt-2 truncate leading-5 text-gray-500 ease-in-out">
        {dayDiff >= 365
          ? `${Math.floor(dayDiff / 365)} ${
              Math.floor(dayDiff / 365) === 1 ? "year" : "years"
            } ago`
          : dayDiff >= 30
          ? `${Math.floor(dayDiff / 30)} ${
              Math.floor(dayDiff / 30) === 1 ? "month" : "months"
            } ago`
          : `${dayDiff} ${dayDiff === 1 ? "day" : "days"} ago`}
      </p>
    </div>
  );
};

export default TimeStamp;
