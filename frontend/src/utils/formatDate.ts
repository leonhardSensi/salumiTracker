export default function formatDate(dateToFormat: string) {
  const updated_at = new Date(dateToFormat);
  const formattedDate = updated_at.toLocaleDateString("de-DE", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
  return formattedDate;
}
