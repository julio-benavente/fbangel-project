export const formatDate = (date) => {
  return new Date(date).toLocaleDateString([], {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};
