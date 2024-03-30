export function getDefaultOption(): any {
  return {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'line',
      },
      backgroundColor: 'rgba(23,23,28,0.6)',
      borderWidth: 0,
      textStyle: { color: '#ffffff', fontWeight: 500, fontFamily: 'Roboto, sans-serif' },
    },
    silent: true,
    grid: {
      left: 72,
      right: 44,
      top: 16,
      bottom: 88,
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: false,
        data: [],
        axisTick: { show: false },
        axisLine: { lineStyle: { color: '#666666', width: 0.5 } },
        axisLabel: { color: '#ffffff', fontWeight: 500, fontFamily: 'Roboto, sans-serif' },
      },
    ],
    yAxis: [
      {
        type: 'value',
        splitLine: { lineStyle: { color: ['#b1b1b166'], type: 'dashed', width: 0.5 } },
        axisLabel: { color: '#ffffff', fontWeight: 500, fontFamily: 'Roboto, sans-serif' },
      },
    ],
    // dataZoom: [{ type: 'inside', start: 0, end: 10 }],
    series: [],
  };
}
