// Converts "YYYY-MM" → "Jun 2024"
export function formatTimelineDate(dateStr: string): string {
  const [year, month] = dateStr.split('-');
  if (!month) return year;
  return new Date(parseInt(year), parseInt(month) - 1, 1).toLocaleDateString(
    'en-US',
    { month: 'short', year: 'numeric' }
  );
}

// Converts a position's startDate + endDate → "Jul 2020 – Sep 2021"
// endDate null = "Present"
export function formatDateRange(
  startDate: string,
  endDate: string | null
): string {
  const start = formatTimelineDate(startDate);
  const end = endDate ? formatTimelineDate(endDate) : 'Present';
  return `${start} – ${end}`;
}

// Extracts just the year from "YYYY-MM" → "2024"
export function getYear(dateStr: string): string {
  return dateStr.split('-')[0];
}
