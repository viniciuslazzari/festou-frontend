export const stringIsValid = (str: string) => {
  if (str.match(/\d+/g)) {
    return false;
  }

  return true;
}