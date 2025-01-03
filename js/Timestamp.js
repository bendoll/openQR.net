function getCurrentTimestamp() {
  const now = new Date();

  // Get user's local time components
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0"); // Months are 0-based
  const day = String(now.getDate()).padStart(2, "0");
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");

  // Return local time in loose ISO8601 format
  return `${year}${month}${day}-${hours}${minutes}${seconds}`;
}
