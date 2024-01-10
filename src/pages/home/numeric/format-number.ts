export function toFixedClip(num: string | number, decimal: number = 4) {
  const str = typeof num === 'number' ? num.toString() : num;
  const matches = str.match(new RegExp(`^\\d+(?:\\.\\d{0,${decimal}})?`));
  console.info(str, matches);
  return (matches && matches[0]) || '0';
}

export function formatNumber(num: number | string) {
  const str = typeof num === 'number' ? num.toString() : num;
  return str.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "'");
}

export function formatMillion(str: number | string) {
  const num = typeof str === 'string' ? Number(str) : str;
  //from high to low
  const units = [
    { d: 1e9, u: 'B' },
    { d: 1e6, u: 'M' },
  ];
  const decimal = units.find((u) => num > u.d);
  if (!decimal) {
    const value = toFixedClip(num, 1);
    const unit = '';
    const text = `${value}${unit}`;
    return { value, unit, text };
  } else {
    const value = toFixedClip(num / decimal.d, 1);
    const unit = decimal.u;
    const text = `${value}${unit}`;
    return { value, unit, text };
  }
}
