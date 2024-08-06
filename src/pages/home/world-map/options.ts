export function getDefaultOption(): any {
  return {
    tooltip: {
      trigger: 'item',
      formatter: 'Nodes: {b0}',
      backgroundColor: 'rgba(255,255,255,0.8)',
      borderWidth: 0,
      textStyle: { color: '#000', fontWeight: 500, fontFamily: 'Roboto, sans-serif' },
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
        borderColor: 'rgba(68, 68, 68, 0.50)',
        areaColor: 'rgba(44, 44, 44, 0.50)',
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
          color:'rgba(90,29,221,1)',
          brushType: 'stroke',
          number: 2,
          period: 5,
          scale: 2.5,
        },
        itemStyle: {
          borderColor: 'rgba(90,29,221,1)',
          borderWidth: 2,
          color: 'rgba(90,29,221,0.5)',
        },
        data: [],
      },
    ],
    textStyle: {
      fontSize: 12,
    },
  };
}
