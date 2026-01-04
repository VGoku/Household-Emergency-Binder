/**
 * Formats a phone number string to (123) 456-7890 format
 * Strips all non-digit characters and formats based on length
 * @param value - The input string to format
 * @returns Formatted phone number string
 */
export function formatPhoneNumber(value: string): string {
  // Strip all non-digit characters
  const digits = value.replace(/\D/g, '');
  
  // Limit to 10 digits (US phone number format)
  const limitedDigits = digits.slice(0, 10);
  
  // Format based on length
  if (limitedDigits.length === 0) {
    return '';
  } else if (limitedDigits.length <= 3) {
    return `(${limitedDigits}`;
  } else if (limitedDigits.length <= 6) {
    return `(${limitedDigits.slice(0, 3)}) ${limitedDigits.slice(3)}`;
  } else {
    return `(${limitedDigits.slice(0, 3)}) ${limitedDigits.slice(3, 6)}-${limitedDigits.slice(6)}`;
  }
}

