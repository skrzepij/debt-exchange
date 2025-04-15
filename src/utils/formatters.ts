/**
 * Formats a date string into readable format.
 * @param {string} dateString - Date string to format.
 * @returns {string} Formatted date string.
 */
export const formatDate = (dateString: string): string => {
  // format dateString to DD-MM-YYYY
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
};

/**
 * Formats a number into currency format.
 * @param {number} value - Number to format.
 * @param {string} [currency='PLN'] - Currency code (default is 'PLN').
 * @param {string} [locale='pl-PL'] - Locale to use for formatting.
 * @returns {string} Formatted currency string.
 */
export const formatCurrency = (
  value: number,
  currency: string = 'PLN',
  locale: string = 'pl-PL'
): string => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  }).format(value);
};
