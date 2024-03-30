export function formatSecondsToMins(seconds: number): string {
  const mins = Math.round((seconds % 60 ** 2) / 60);

  return `${mins}`;
}
