// src/utils/dateUtils.js - Add this function
export function parseCustomDate(dateString) {
    if (!dateString) return new Date(0);
    
    // Check if dateString matches DD-MM-YYYY pattern (31-05-2021)
    const parts = dateString.split('-');
    if (parts.length === 3) {
      const day = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10) - 1; // JS months are 0-indexed
      const year = parseInt(parts[2], 10);
      
      // Validate the parts to make sure they are valid numbers
      if (!isNaN(day) && !isNaN(month) && !isNaN(year)) {
        return new Date(year, month, day);
      }
    }
    
    // Fallback to standard date parsing
    return new Date(dateString);
  }
  
  // Format the date to display as DD/MM/YYYY
  export function formatDateAsDDMMYYYY(date) {
    if (!(date instanceof Date) || isNaN(date)) {
      return '';
    }
    
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const year = date.getFullYear();
    
    return `${day}/${month}/${year}`;
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