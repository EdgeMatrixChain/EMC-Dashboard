export default {
  legend: {
    top: 0,
    left: 0,
    data: [],
  },
  tooltip: {
    trigger: 'item',
    formatter: 'nodes: {b0}',
  },
  geo: {
    type: 'map',
    map: 'world',
    roam: true,
    scaleLimit: {
      min: 1.6,
      max: 100,
    },
    center: [0.46, 26.92],
    zoom: 2,
    label: {
      show: false,
    },
    itemStyle: {
      opacity: 1,
      borderColor: '#444444',
      areaColor: '#383838',
      borderWidth: 1,
    },
    emphasis: {
      disabled: true,
      areaColor: '#fff',
      itemStyle: {
        areaColor: '#eee',
      },
    },
  },
  series: [
    {
      name: '',
      type: 'effectScatter',
      coordinateSystem: 'geo',
      zlevel: 3,
      rippleEffect: {
        brushType: 'stroke',
        number: 2,
        period: 5,
        scale: 2.5,
      },
      itemStyle: {
        borderColor: '#7B00A6',
        borderWidth: 2,
        color: '#BD6FD948',
      },
      data: [],
    },
  ],
  textStyle: {
    fontSize: 12,
  },
};
