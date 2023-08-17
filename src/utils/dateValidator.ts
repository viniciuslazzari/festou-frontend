export const dateIsValid = (date: string) => {
  if (date.length < 10) return false;
    
  let datepart: string[] = date.split('/');

  let day = parseInt(datepart[0]);
  let month = parseInt(datepart[1]);
  let year = parseInt(datepart[2]);

  if (month < 1 || month > 12) return false;
  if (year < 1900 || year > 2022) return false;

  let ListofDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  if (month !== 2) {
    if (day > ListofDays[month - 1]) return false;

    return true
  }

  let leapYear = false;

  if ((!(year % 4) && year % 100) || !(year % 400)) leapYear = true;
  
  if (!leapYear && day >= 29) return false;
  if (leapYear && day > 29) return false;

  return true;
}