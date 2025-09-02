export function formatMoney(amount, currency = 'INR', locale = 'en-IN') {
  return new Intl.NumberFormat(locale, { style: 'currency', currency }).format(amount);
}

export function formatDate(iso, locale = 'en-IN', opts = { dateStyle: 'medium', timeStyle: 'short' }) {
  const d = typeof iso === 'string' ? new Date(iso) : iso;
  return new Intl.DateTimeFormat(locale, opts).format(d);
}
