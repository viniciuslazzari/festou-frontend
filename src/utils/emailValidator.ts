export const emailIsValid = (email: string) => {
  if (!email.includes("@")) return false;
  if (!email.includes(".")) return false;

  const lastIndex = email.lastIndexOf(".");
  const after = email.slice(lastIndex + 1);

  if (after.length < 2) return false;

  return true
}