const TIME_ZONE = 'Pacific/Honolulu';

/** Calendar day (YYYY-MM-DD) of a date in Hawaii time. */
const dayKey = (date: Date): string => date.toLocaleDateString('en-CA', { timeZone: TIME_ZONE });

/** Whole calendar days from `now` to `date` (negative for past days), in Hawaii time. */
const daysBetween = (date: Date, now: Date): number => {
  const utcMidnight = (key: string) => Date.parse(`${key}T00:00:00Z`);
  return Math.round((utcMidnight(dayKey(date)) - utcMidnight(dayKey(now))) / 86_400_000);
};

/**
 * Format a ride's start for the My Rides list:
 * "Today", "Tomorrow" or "Yesterday" for the nearest days, otherwise "Mon, Nov 23"
 * (the year is added only when it is not the current year, e.g. "Sat, Dec 20, 2025"), then the time.
 */
export const formatRideDate = (date: Date, now: Date = new Date()): string => {
  const diff = daysBetween(date, now);
  const time = date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', timeZone: TIME_ZONE });
  const names: Record<number, string> = { 0: 'Today', 1: 'Tomorrow', [-1]: 'Yesterday' };
  if (names[diff]) return `${names[diff]} · ${time}`;
  const sameYear = dayKey(date).slice(0, 4) === dayKey(now).slice(0, 4);
  const day = date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    ...(sameYear ? {} : { year: 'numeric' }),
    timeZone: TIME_ZONE,
  });
  return `${day} · ${time}`;
};
