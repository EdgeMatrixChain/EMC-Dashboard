<template>
  <div class="chart-pie" ref="chartRef"></div>
</template>

<script lang="ts" setup>
import { ref, onMounted, watch, PropType, onUnmounted } from 'vue';
import * as echarts from 'echarts';
import { getDefaultOption } from './options';
import { useIsMobile } from '@/composables/use-screen';
import moment from 'moment';
export type DataItem = any | { decayPeriod: string; days: string; e: string; pi: string; decayFactor: string; periodicReward: string; epochReward: string };

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

function getSeries(name: string, data: number[]) {
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
    lineStyle: {
      color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
        { offset: 0, color: '#2f0593' },
        { offset: 1, color: '#861cb9' },
      ]),
      width: 1,
    },
    data: data,
  };
}

const updateChart = (data: DataItem[]) => {
  if (!chart) return;
  const dates: string[] = [];
  const rewardValue: number[] = [];
  let beginDate = moment.utc([2024, 0, 1]);
  data.forEach((item) => {
    const beginDateStr = beginDate.format('MM/DD/YYYY');
    const endDate = beginDate.add(Number(item.days), 'day');
    const endDateStr = endDate.format('MM/DD/YYYY');
    const date = `${beginDateStr}~${endDateStr}`;
    dates.push(date);
    rewardValue.push(Number(item.epochReward) || 0);
  });
  console.info(dates);
  const xAxisLables = dates;
  const series = getSeries('Periodic Reward', rewardValue);
  chart.setOption({
    xAxis: [{ data: xAxisLables }],
    series: [series],
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
  /* background-color: rgba(0, 0, 0, 0.1);
  border: 1px solid #3d1a5a;
  border-radius: 16px; */
}
</style>
