export const list = [
  { label: 'Days30', value: 0 },
  { label: 'Days90', value: 1 },
  { label: 'Days180', value: 2 },
  { label: 'Days360', value: 3 },
  { label: 'Days720', value: 4 },
  { label: 'Days1080', value: 5 },
];

type Item = { label: string; value: number };

type Mapping = { [k: string]: Item };

export const map: Mapping = (() => {
  const _map: Mapping = {};
  list.forEach((item) => {
    _map[String(item.value)] = item;
  });
  return _map;
})();
