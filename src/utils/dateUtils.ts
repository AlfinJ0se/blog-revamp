import { format, parseISO } from 'date-fns';

export function formatDate(dateString: string): string {
  try {
    const date = parseISO(dateString);
    return format(date, 'MMMM dd, yyyy');
  } catch (error) {
    console.error('Error formatting date:', error);
    return dateString;
  }
}

export function formatDateShort(dateString: string): string {
  try {
    const date = parseISO(dateString);
    return format(date, 'MMM dd');
  } catch (error) {
    console.error('Error formatting date:', error);
    return dateString;
  }
}