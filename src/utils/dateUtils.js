// src/utils/dateUtils.js
export function parseCustomDate(dateString) {
  // Log the input for debugging
  console.log('Parsing date:', dateString);

  if (!dateString) return new Date(0);
  
  // Try parsing ISO format (YYYY-MM-DD) first
  const isoDateParse = Date.parse(dateString);
  if (!isNaN(isoDateParse)) {
    const parsedDate = new Date(dateString);
    console.log('Parsed date via ISO format:', parsedDate);
    return parsedDate;
  }
  
  // Check if dateString matches DD-MM-YYYY pattern (31-05-2021)
  const parts = dateString.split('-');
  if (parts.length === 3) {
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1; // JS months are 0-indexed
    const year = parseInt(parts[2], 10);
    
    // Validate the parts to make sure they are valid numbers
    if (!isNaN(day) && !isNaN(month) && !isNaN(year)) {
      const parsedDate = new Date(year, month, day);
      console.log('Parsed date via DD-MM-YYYY:', parsedDate);
      return parsedDate;
    }
  }
  
  // If all else fails, create a date object
  const fallbackDate = new Date(dateString);
  console.log('Fallback date parsing:', fallbackDate);
  return fallbackDate;
}

// Format the date to display as DD/MM/YYYY
export function formatDateAsDDMMYYYY(date) {
  if (!(date instanceof Date) || isNaN(date)) {
    console.log('Invalid date for formatting:', date);
    return '';
  }
  
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
  const year = date.getFullYear();
  
  const formattedDate = `${day}/${month}/${year}`;
  console.log('Formatted date:', formattedDate);
  return formattedDate;
}

// Alternative using toLocaleDateString with options
export function formatDateLocalized(date) {
  if (!(date instanceof Date) || isNaN(date)) {
    return '';
  }
  
  // Format as day/month/year
  return date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
}