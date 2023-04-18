function formatSecondsToDuration(seconds: number): string {
  const secs = ~~seconds % 60;
  const mins = ~~((seconds % 60 ** 2) / 60);
  const hours = ~~((seconds % 60 ** 3) / 60 ** 2);

  if (hours > 0) {
    return `${hours < 10 ? '0' : ''}${hours}:${mins < 10 ? '0' : ''}${mins}:${
      secs < 10 ? '0' : ''
    }${secs}`;
  }

  return `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

export default formatSecondsToDuration;
