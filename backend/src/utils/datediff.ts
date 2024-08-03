export const getDataeDiff = (date1: Date, date2: Date): number => {
  const timeDiff = date1.getTime() - date2.getTime();
  const day = timeDiff / (1000 * 60 * 60 * 24);
  return day;
};
