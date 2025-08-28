export function monthToRange(monthNameOrNum, year = new Date().getFullYear()) {
  let month;
  if (typeof monthNameOrNum === 'string') {
    const idx = ['jan','feb','mar','apr','may','jun','jul','aug','sep','oct','nov','dec']
      .indexOf(monthNameOrNum.slice(0,3).toLowerCase());
    month = idx >= 0 ? idx : null;
  } else {
    month = Number(monthNameOrNum) - 1;
  }
  if (month == null || month < 0 || month > 11) return null;
  const start = new Date(Date.UTC(year, month, 1, 0, 0, 0));
  const end = new Date(Date.UTC(year, month + 1, 0, 23, 59, 59));
  return { start, end };
}
