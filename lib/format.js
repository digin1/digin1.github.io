// Shared formatting helpers. Safe to import from server and client components.

export const categoryLabels = {
  research: 'Research project',
  commercial: 'Commercial project',
  personal: 'Independent project',
  education: 'Academic project',
};

export function getTags(tagString = '', limit = Infinity) {
  return String(tagString)
    .split(',')
    .map(tag => tag.trim())
    .filter(Boolean)
    .slice(0, limit);
}

function toDate(value) {
  if (!value) return null;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

// Front-matter dates like "2025-01-15" parse as UTC midnight. Format them in
// UTC too, so the static HTML (built in UTC) and the browser agree on the day.
export function formatDate(value, options = { year: 'numeric', month: 'long', day: 'numeric' }) {
  const date = toDate(value);
  return date ? date.toLocaleDateString('en-GB', { ...options, timeZone: 'UTC' }) : '';
}

export function getYear(value, fallback = '') {
  const date = toDate(value);
  return date ? String(date.getUTCFullYear()) : fallback;
}
