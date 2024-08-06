<template>
  <div class="chart-pie" ref="chartRef"></div>
</template>

<script lang="ts" setup>
import { ref, onMounted, watch, PropType, onUnmounted } from 'vue';
import * as echarts from 'echarts';
import { getDefaultOption } from './options';
import { useIsMobile } from '@/composables/use-screen';

export type DataItem = { key: string; nodes?: number; gpus?: number };

const props = defineProps({
  data: { type: Array as PropType<DataItem[]>, default: () => [] },
});

const isMobile = useIsMobile();

const chartRef = ref<HTMLDivElement>();

let chart: echarts.ECharts;

const initChart = () => {
  if (!chartRef.value) return;
  chart = echarts.init(chartRef.value);
  const options = getDefaultOption();
  if (isMobile.value) {
    options.grid = { left: 48, right: 16, top: 20, bottom: 32 };
  } else {
    options.grid = { left: 64, right: 44, top: 44, bottom: 44 };
  }

  chart.setOption(options);
  if (props.data.length > 0) {
    updateChart(props.data);
  }
};

function getSeriesBar(name: string, itemStyle: any, data: number[]) {
  const labelOption = {
    show: false,
    position: 'insideBottom',
    distance: 12,
    align: 'left',
    rotate: 90,
    verticalAlign: 'middle',
    formatter: '{c}  {name|{a}}',
    fontSize: 16,
    rich: {
      name: {},
    },
  };

  return {
    name: name,
    type: 'bar',
    barGap: '60%',
    barWidth: isMobile.value ? 4 : 14,
    label: labelOption,
    itemStyle,
    emphasis: { focus: 'series' },
    data: data,
  };
}

const updateChart = (data: DataItem[]) => {
  if (!chart) return;
  const dates: string[] = [];
  const nodeValue: number[] = [];
  const gpuValue: number[] = [];
  data.forEach((item) => {
    dates.push(item.key);
    nodeValue.push(item.nodes || 0);
    gpuValue.push(item.gpus || 0);
  });
  const gpuBarStyle = {
    normal: {
      borderRadius: [10, 10, 0, 0],
      color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
        { offset: 0, color: '#533AE6' },
        { offset: 1, color: '#1985FE' },
      ]),
    },
  };
  const nodeBarStyle = {
    normal: {
      borderRadius: [10, 10, 0, 0],
      color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
        { offset: 0, color: '#36EBCA' },
        { offset: 1, color: '#1882FF' },
      ]),
    },
  };
  const xAxisLables = dates;
  const nodeSeries = getSeriesBar('Nodes', nodeBarStyle, nodeValue);
  const gpuSeries = getSeriesBar('GPUs', gpuBarStyle, gpuValue);
  chart.setOption({
    xAxis: [{ data: xAxisLables }],
    series: [nodeSeries, gpuSeries],
  });
};

watch(
  () => props.data,
  (val) => updateChart(val)
);

onMounted(() => {
  setTimeout(() => initChart(), 20);
});

onUnmounted(() => {
  chart.dispose();
});
</script>

<style scoped>
.chart-pie {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}

@media (min-width: 640px) {
  .chart-pie {
    border-radius: 16px;
  }
}
</style>
