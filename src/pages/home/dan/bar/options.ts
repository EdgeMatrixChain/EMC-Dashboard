export function getDefaultOption(): any {
  return {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
      borderWidth: 0,
      textStyle: { color: '#000', fontWeight: 500, fontFamily: 'Roboto, sans-serif' },
    },
    grid: {
      left: 64,
      right: 44,
      top: 44,
      bottom: 44,
    },

    xAxis: [
      {
        type: 'category',
        axisTick: { show: false },
        data: [],
        axisLine: { lineStyle: { color: '#666666', width: 0.5 } },
        axisLabel: { color: '#CCC', fontWeight: 500, fontFamily: 'Roboto, sans-serif' },
      },
    ],
    yAxis: [
      {
        type: 'value',
        splitLine: { lineStyle: { color: ['#b1b1b166'], type: 'dashed', width: 0.5 } },
        axisLabel: { color: '#CCC', fontWeight: 500, fontFamily: 'Roboto, sans-serif' },
      },
    ],
    series: [],
  };
}
