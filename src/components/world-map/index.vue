<template>
  <div class="chart-view">
    <div class="chart-map" ref="chartRef"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, watch, PropType } from 'vue';
import * as echarts from 'echarts';
import world from './map/js/world';
import chartOption from './chart-option';

export type DataItem = { name: string; value: number[]; symbolSize: number };

export default defineComponent({
  props: {
    data: { type: Array as PropType<DataItem[]>, default: () => [] },
  },
  setup(props, ctx) {
    echarts.registerMap('world', world as any);
    const chartRef = ref<HTMLDivElement>();

    let chartInstance: echarts.ECharts;

    const initMap = () => {
      let chart = echarts.init(chartRef.value);
      chart.setOption(chartOption);
      return chart;
    };

    watch(
      () => props.data,
      (val) => {
        if (!chartInstance) return;
        chartInstance.setOption({ series: { data: val } });
      }
    );

    onMounted(async () => {
      if (!chartRef.value) return;
      chartInstance = initMap();
    });

    return {
      chartRef,
    };
  },
});
</script>

<style scoped>
.chart-view {
  width: 100%;
  padding-top: calc(100% * 0.4);
  position: relative;
  border-radius: 20px;
  border: 1px solid #000;
  background-color: #171717;
  overflow: hidden;
}
.chart-map {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}
</style>
