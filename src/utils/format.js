export function formatDate(date) {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

export function formatFloat(num) {
  if (isNaN(num)) {
    return "0.00";
  }
  return parseFloat(num).toFixed(2);
}
