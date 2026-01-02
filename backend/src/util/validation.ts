const isValidText = (value: string): boolean => value?.trim().length > 0;

const isValidDate = (value: string): boolean => {
  const date = new Date(value);
  return date.toString() !== "Invalid Date";
};

const isValidImageUrl = (value: string): boolean => value?.startsWith("http");

export { isValidText, isValidDate, isValidImageUrl };
