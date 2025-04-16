import { formatDate, formatCurrency } from './formatters';
import { describe, it, expect } from 'vitest';

describe('formatters', () => {
  describe('formatDate', () => {
    it('should format date string to DD-MM-YYYY', () => {
      expect(formatDate('2023-01-15')).toBe('15-01-2023');
    });

    it('should handle single digit days and months with padding', () => {
      expect(formatDate('2023-01-05')).toBe('05-01-2023');
      expect(formatDate('2023-05-15')).toBe('15-05-2023');
      expect(formatDate('2023-04-09')).toBe('09-04-2023');
    });

    it('should handle leap years', () => {
      expect(formatDate('2024-02-29')).toBe('29-02-2024');
    });
  });

  describe('formatCurrency', () => {
    it('should format number with default currency PLN', () => {
      const formatted = formatCurrency(1000);
      expect(formatted).toContain('1');
      expect(formatted).toContain('000');
      // Should contain either PLN or zł
      expect(formatted.includes('PLN') || formatted.includes('zł')).toBeTruthy();
    });

    it('should format number with custom currency', () => {
      const formatted = formatCurrency(1000, 'USD');
      expect(formatted).toContain('1');
      expect(formatted).toContain('000');
      // Should contain either USD or $
      expect(formatted.includes('USD') || formatted.includes('$')).toBeTruthy();
    });

    it('should format number with custom locale', () => {
      const formatted = formatCurrency(1000, 'USD', 'en-US');
      expect(formatted).toContain('1');
      expect(formatted.includes('1,000') || formatted.includes('1 000')).toBeTruthy();
      expect(formatted.includes('USD') || formatted.includes('$')).toBeTruthy();
    });

    it('should handle negative values', () => {
      const formatted = formatCurrency(-1000);
      expect(formatted).toContain('-');
      expect(formatted).toContain('1');
      expect(formatted).toContain('000');
    });

    it('should handle zero value', () => {
      const formatted = formatCurrency(0);
      expect(formatted).toContain('0');
    });

    it('should handle decimal values', () => {
      const formatted = formatCurrency(1000.5);
      expect(formatted).toContain('1');
      expect(formatted).toContain('000');
      // Should contain either .50 or ,50 depending on locale
      expect(formatted.includes('.50') || formatted.includes(',50')).toBeTruthy();
    });

    it('should handle large numbers', () => {
      const formatted = formatCurrency(1000000);
      expect(formatted).toContain('zł');
      expect(formatted).not.toContain('PLN');

      const cleanFormatted = formatted.replace(/\s+/g, ' ').trim();
      expect(cleanFormatted).toMatch(/1\s*000\s*000,00\s*zł/);
    });
  });
});
