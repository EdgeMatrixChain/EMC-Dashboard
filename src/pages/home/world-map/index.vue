<template>
  <div class="chart-view">
    <div class="chart-map" ref="chartRef"></div>
    <div class="chart-view-header">
      <span class="chart-view-title">Node Distribution</span>
    </div>
    <div class="chart-view-zoom">
      <div class="zoom-1" @click.prevent.stop="onPressZoom(3)">
        <img class="zoom-icon" src="@/assets/icon_zoom_up.svg" />
      </div>
      <div class="zoom-2" @click.prevent.stop="onPressZoom(-3)">
        <img class="zoom-icon" src="@/assets/icon_zoom_down.svg" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, watch, PropType, onUnmounted } from 'vue';
import { NSpace } from 'naive-ui';
import * as echarts from 'echarts';
import { getDefaultOption } from './options';
import world from './world.json';
import { useIsMobile } from '@/composables/use-screen';
export type DataItem = { name: string; value: number[]; symbolSize: number };

const props = defineProps({
  data: { type: Array as PropType<DataItem[]>, default: () => [] },
});
const isMobile = useIsMobile();
echarts.registerMap('world', world as any);
const chartRef = ref<HTMLDivElement>();

let chart: echarts.ECharts;

function onPressZoom(delta: number) {
  zoom(delta);
}

function zoom(delta: number) {
  let option: any = chart.getOption();
  let geo = option.geo[0];

  let newZoom = geo.zoom + delta;
  newZoom = Math.max(newZoom, 1);
  newZoom = Math.min(newZoom, 12);

  geo.zoom = newZoom;

  chart.setOption(option);
}

const initChart = () => {
  if (!chartRef.value) return;
  chart = echarts.init(chartRef.value);
  const options = getDefaultOption();
  options.geo.roam = 'move';
  // if (isMobile.value) {
  //   options.geo.roam = 'scale';
  // } else {
  //   options.geo.roam = 'move';
  // }
  chart.setOption(options);

  updateChart(props.data);
};

const updateChart = (data: any) => {
  if (!chart) return;
  chart.setOption({ series: { data } });
};

watch(
  () => props.data,
  (val) => updateChart(val)
);

onMounted(async () => {
  initChart();
});

onUnmounted(() => {
  chart.dispose();
});
</script>

<style scoped>
.chart-view {
  width: 100%;
  padding-top: calc(100% * 0.4);
  position: relative;
  border-radius: 16px;
  border: 1px solid #3d1a5a;
  background-color: var(--bg-color2);
  overflow: hidden;
}
.chart-map {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}

.chart-view-header {
  position: absolute;
  left: 4px;
  top: 4px;
  padding: 4px 8px;
  background-color: var(--bg-color2);
  border-radius: 4px;
}

.chart-view-title {
  font-family: Oxanium;
  font-size: 14px;
  font-weight: 500;
}

.chart-view-zoom {
  position: absolute;
  right: 4px;
  bottom: 4px;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  gap: 8px 0;
}
.zoom-1,
.zoom-2 {
  width: 24px;
  height: 24px;
  border-radius: 100%;
  background-color: var(--bg-color2);
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: center;
}

.zoom-icon {
  width: 14px;
  height: 14px;
  object-fit: cover;
}

@media (min-width: 640px) {
  .chart-view-header {
    left: 16px;
    top: 16px;
    padding: 4px 12px;
  }

  .chart-view-zoom {
    gap: 16px 0;
  }
  .chart-view-zoom {
    right: 16px;
    bottom: 16px;
  }
}
</style>
