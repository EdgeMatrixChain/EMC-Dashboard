<template>
  <div class="chart-pie" ref="chartRef"></div>
</template>

<script lang="ts" setup>
import { ref, onMounted, watch, PropType, onUnmounted } from 'vue';
import { NSpace } from 'naive-ui';
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
    barGap: 0,
    barWidth: 16,
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
      color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
        { offset: 0, color: '#35E2FA' },
        { offset: 1, color: '#9B27F2' },
      ]),
    },
  };
  const nodeBarStyle = {
    normal: {
      color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
        { offset: 0, color: '#F55E87' },
        { offset: 1, color: '#F6997A' },
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
  background-color: rgba(0, 0, 0, 0.1);
  border: 1px solid #3d1a5a;
  border-radius: 16px;
}
</style>
