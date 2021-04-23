export const formatDate = (timestamp: number) => {
  const date = new Date(timestamp * 1000);
  const hour = date.getHours();
  const mins = date.getMinutes();
  return `${hour < 10 ? `0${hour}` : hour}:${mins < 10 ? `0${mins}` : mins}`;
};

export const utcFormatDate = (timestamp: number) => {
  const date = new Date(0);
  date.setUTCSeconds(timestamp);
  return date;
};
