export function toFixedClip(num: string | number, decimal: number = 4) {
  const str = typeof num === 'number' ? num.toString() : num;
  const matches = str.match(new RegExp(`^\\d+(?:\\.\\d{0,${decimal}})?`));
  return (matches && matches[0]) || '0';
}

export function formatNumber(num: number | string) {
  const str = typeof num === 'number' ? num.toString() : num;
  const [n, n1] = str.split('.');
  const n0 = n.replace(/\B(?=(\d{3})+(?!\d))/g, "'");
  return n1 ? `${n0}.${n1}` : n0;
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
    const value = toFixedClip(num, 2);
    const unit = '';
    const text = `${value}${unit}`;
    return { value, unit, text };
  } else {
    const value = toFixedClip(num / decimal.d, 2);
    const unit = decimal.u;
    const text = `${value}${unit}`;
    return { value, unit, text };
  }
}
