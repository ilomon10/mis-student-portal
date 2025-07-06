// get active school year by current date
// return: string
// example: 2020/2021
// getMonth, starts from 0 = January
export const getActiveSchoolYear = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth();
  const schoolYear = month >= 6 ? `${year}/${year + 1}` : `${year - 1}/${year}`;
  return schoolYear;
};
