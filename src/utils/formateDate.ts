export const formateDate = (providedDate: string | undefined) => {
  const isoDate = providedDate;
  const date = new Date(isoDate ?? "");

  const formattedDateOfCreatedAt = date.toLocaleString("en-US", {
    month: "long",
    day: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
  return formattedDateOfCreatedAt;
};
