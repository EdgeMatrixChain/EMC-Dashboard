<template>
  <div class="chart-map">
    <div ref="chartRef" :style="{ width: '1400px', height: '440px' }"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, watch, PropType } from 'vue';
import * as echarts from 'echarts';
import world from './map/js/world';
import chartOption from './chart-option';

export type DataItem = { name: string, value: number[], symbolSize: number };

export default defineComponent({
  props: {
    data: { type: Array as PropType<DataItem[]>, default: () => [] }
  },
  setup(props, ctx) {
    echarts.registerMap('world', world as any);
    const chartRef = ref<HTMLDivElement>();
    
    let chartInstance: echarts.ECharts;

    const initMap = () => {
      let chart = echarts.init(chartRef.value);
      chart.setOption(chartOption);
      return chart;
    }

    watch(() => props.data, (val) => {
      if (!chartInstance) return;
      chartInstance.setOption({ series: { data: val } })
    });

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
.chart-map {
  width: 100%;
  height: 440px;
  border: 1px solid #000;
  border-radius: 20px;
  position: relative;
  background-color: #171717;
  overflow: hidden;
}

.chart-mask {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 56px;
  background-color: rgba(0, 0, 0, 0.377);
  z-index: 10;
}
</style>
