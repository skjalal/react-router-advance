const isValidText = (value: string, minLength = 1): boolean =>
  value?.trim().length > minLength;

const isValidDate = (value: string): boolean => {
  const date = new Date(value);
  return date.toString() !== "Invalid Date";
};

const isValidImageUrl = (value: string): boolean => value?.startsWith("http");

const isValidEmail = (value: string): boolean => value?.includes("@");

export { isValidText, isValidDate, isValidImageUrl, isValidEmail };
