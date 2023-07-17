<template>
  <div class="chart-map">
    <div id="chart-container" :style="{ width: '1400px', height: '440px' }"></div>
  </div>
</template>

<script lang="ts">
import { onMounted, defineComponent } from 'vue';
import * as echarts from 'echarts';
import './map/js/world.js';
// import 'echarts/map/js/china.js';

export default defineComponent({
  setup() {
    onMounted(() => {
      let echart = echarts;

      const myEcharts: any = document.getElementById('chart-container');
      if (typeof myEcharts !== null) {
        let myEchart = echart.init(myEcharts);
        var geoCoordMap: any = [
          // { name: '', value: [34.909912, 60.169095], symbolSize: 4 },
          // { name: '', value: [13.402393, 52.518569], symbolSize: 8 },
          // { name: '', value: [-0.126608, 51.208425], symbolSize: 8 },
          // { name: '', value: [126.979208, 37.53875], symbolSize: 8 },
          // { name: '', value: [139.710164, 35.706962], symbolSize: 8 },
        ];
        var data: any = [
          // { name: '', value: [135.193845, -25.304039], symbolSize: 8 },
          // { name: '', value: [-100.696295, 33.679979], symbolSize: 8 },
        ];
        let option = {
          legend: {
            top: 0,
            left: 130,
            data: [],
          },
          geo: {
            type: 'map',
            map: 'world',
            roam: true,
            center: [116.46, 39.92],
            zoom: 5,
            label: {
              show: false,
              // emphasis: {
              //   show: false,
              // },
            },
            itemStyle: {
              opacity: 0.6,
              borderColor: '#444444',
              areaColor: '#383838',
              borderWidth: 1,
              // emphasis: {
              //   show: false,
              //   areaColor: 'red',
              // },
            },
          },
          series: [
            {
              name: '',
              type: 'scatter',
              coordinateSystem: 'geo',
              zlevel: 3,
              rippleEffect: {
                brushType: 'fill',
              },
              label: {
                color: '#000',
                show: true,
                position: 'top',
                formatter: '{b}',
              },
              itemStyle: {
                color: '#18849C',
              },
              data: geoCoordMap,
            },
            {
              name: '可注册国家',
              type: 'scatter',
              coordinateSystem: 'geo',
              zlevel: 3,
              rippleEffect: {
                brushType: 'fill',
              },
              label: {
                show: true,
                color: '#000',
                position: 'top',
                formatter: '{b}',
              },
              itemStyle: {
                color: '#fff',
                borderColor: '#18849C',
                borderWidth: 1,
              },
              data: data,
            },
          ],
          textStyle: {
            fontSize: 12,
          },
        };
        myEchart.setOption(option);
      }
      // window.addEventListener('resize', function () {});
    });
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
</style>
