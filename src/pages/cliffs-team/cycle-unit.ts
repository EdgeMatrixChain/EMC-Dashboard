export const list = [
  { label: 'Days30', value: 0, days: 30 },
  { label: 'Days90', value: 1, days: 90 },
  { label: 'Days180', value: 2, days: 180 },
  { label: 'Days360', value: 3, days: 360 },
  { label: 'Days720', value: 4, days: 720 },
  { label: 'Days1080', value: 5, days: 1080 },
];

type Item = { label: string; value: number; days: number };

type Mapping = { [k: string]: Item };

export const map: Mapping = (() => {
  const _map: Mapping = {};
  list.forEach((item) => {
    _map[String(item.value)] = item;
  });
  return _map;
})();
