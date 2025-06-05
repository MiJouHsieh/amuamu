export function formatTime(seconds) {
  const hours = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  const parts = [];
  if (hours > 0) parts.push(`${hours} ${hours === 1 ? "hour" : "hours"}`);
  if (mins > 0) parts.push(`${mins} ${mins === 1 ? "minute" : "minutes"}`);
  if (secs > 0 || parts.length === 0)
    parts.push(`${secs} ${secs === 1 ? "second" : "seconds"}`);

  return parts.join(" ");
}
