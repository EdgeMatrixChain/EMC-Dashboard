export function getDefaultOption(): any {
  return {
    tooltip: {
      trigger: 'item',
      formatter: 'Nodes: {b0}',
    },
    geo: {
      type: 'map',
      map: 'world',
      scaleLimit: {
        min: 2,
        max: 100,
      },
      center: [0, 30],
      zoom: 0,
      label: {
        show: false,
      },
      itemStyle: {
        borderColor: '#444444',
        areaColor: '#383838',
        borderWidth: 1,
      },
      emphasis: {
        disabled: true,
      },
    },
    series: [
      {
        type: 'effectScatter',
        coordinateSystem: 'geo',
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
}
