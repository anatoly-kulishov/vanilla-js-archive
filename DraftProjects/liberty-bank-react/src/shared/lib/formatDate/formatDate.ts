export const formatDate = (terminationDate: string) => {
  return terminationDate.split('-').reverse().join('.');
};
