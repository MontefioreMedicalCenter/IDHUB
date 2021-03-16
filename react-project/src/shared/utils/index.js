export const deepCopy = (data) => {
  // deep copy
  if ([null, undefined].includes(data)) {
    return null;
  }
  return JSON.parse(JSON.stringify(data));
};
