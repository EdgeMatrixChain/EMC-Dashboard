<template>
  <div class="chart-pie" ref="chartRef"></div>
</template>

<script lang="ts" setup>
import { ref, onMounted, watch, PropType, onUnmounted } from 'vue';
import * as echarts from 'echarts';
import { getDefaultOption } from './options';
import { useIsMobile } from '@/composables/use-screen';
import moment from 'moment';
import type { ScheduleData, ScheduleDataItem } from '../../data';

const props = defineProps({
  data: { type: Object as PropType<ScheduleData>, default: () => [] },
});

const isMobile = useIsMobile();

const chartRef = ref<HTMLDivElement>();

let chart: echarts.ECharts;

const initChart = () => {
  if (!chartRef.value) return;
  chart = echarts.init(chartRef.value);
  const options = getDefaultOption();
  if (isMobile.value) {
    options.grid = { left: 48, right: 16, top: 16, bottom: 32 };
  } else {
    options.grid = { left: 80, right: 44, top: 24, bottom: 32 };
  }
  chart.setOption(options);
  const scheduleData = props.data;
  if (scheduleData.data.length > 0) {
    updateChart(scheduleData.data);
  }
};

function getSeries(name: string, data: number[]) {
  const lineColor = new echarts.graphic.LinearGradient(0, 0, 1, 0, [
    { offset: 0, color: '#2f0593' },
    { offset: 1, color: '#861cb9' },
  ]);
  return {
    name: name,
    type: 'line',
    // stack: 'Total',
    // areaStyle: {
    //   color: new echarts.graphic.RadialGradient(0, 0, 0, [
    //     { offset: 0, color: '#3ba272' },
    //     { offset: 1, color: '#9B27F2' },
    //   ]),
    // },
    symbol: 'circle',
    symbolSize: 4,
    itemStyle: {
      color: '#861cb9',
    },
    step: 'end',
    lineStyle: { color: lineColor, width: 1 },
    data: data,
  };
}

const updateChart = (data: ScheduleDataItem[]) => {
  if (!chart) return;
  const dates: string[] = [];
  const epochValue: number[] = [];
  const periodicValue: number[] = [];
  data.forEach((item, index) => {
    dates.push(item.name);
    epochValue.push(item.epochReward);
    periodicValue.push(item.periodicReward);
  });
  const xAxisLables = dates;
  const series1 = getSeries('Epoch Reward', epochValue);
  // const series2 = getSeries('Periodic Reward', periodicValue);
  chart.setOption({
    xAxis: [{ data: xAxisLables }],
    series: [series1],
  });
};

watch(
  () => props.data,
  (val) => updateChart(val.data)
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
  /* background-color: rgba(0, 0, 0, 0.1);
  border: 1px solid #3d1a5a;
  border-radius: 16px; */
}
</style>
