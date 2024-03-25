<template>
  <div class="chart-pie" ref="chartRef"></div>
</template>

<script lang="ts" setup>
import { ref, onMounted, watch, PropType, onUnmounted } from 'vue';
import { NSpace } from 'naive-ui';
import * as echarts from 'echarts';
import { getDefaultOption } from './options';
import { useIsMobile } from '@/composables/use-screen';

export type DataItem = { name: string; value?: number; color?: string };

const props = defineProps({
  data: { type: Array as PropType<DataItem[]>, default: () => [] },
});

const isMobile = useIsMobile();

const chartRef = ref<HTMLDivElement>();

let chart: echarts.ECharts;

const initChart = () => {
  if (!chartRef.value) return;
  chart = echarts.init(chartRef.value);
  const options = getDefaultOption(props.data);
  chart.setOption(options);

  // updateChart(props.data);
};

const updateChart = (data: any) => {
  if (!chart) return;
  chart.setOption({ series: { data } });
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
</style>
