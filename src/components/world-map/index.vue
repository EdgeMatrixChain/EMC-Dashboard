<template>
  <div class="chart-map">
    <div id="chart-container" :style="{ width: '1400px', height: '440px' }"></div>
    <template v-if="isWhell">
      <div class="chart-mask"></div>
    </template>
  </div>
</template>

<script lang="ts">
import { onMounted, defineComponent, ref } from 'vue';
import * as echarts from 'echarts';
import world from './map/js/world';
import { Http } from '@/tools/http';

// import 'echarts/map/js/china.js';

export default defineComponent({
  setup() {
    const http = Http.getInstance();
    const isWhell = ref(false);

    onMounted(async () => {
      const myEcharts: any = document.getElementById('chart-container');
      const resp = await http.get({ url: 'https://api.edgematrix.pro/api/v1/ipmap' });

      const IPMap = resp.data || [];
      const newIPMap: any = [];

      IPMap.forEach((item: any) => {
        if (!item.latitude || !item.longitude || item.nodes === 0) return;
        const data = {
          name: item.nodes,
          value: [item.longitude, item.latitude],
          symbolSize: item.nodes * 10 > 60 ? 60 : item.nodes * 10,
        };
        newIPMap.push(data);
      });

      if (typeof myEcharts !== null) {
        echarts.registerMap('world', world as any);

        let myEchart = echarts.init(myEcharts);

        let option = {
          legend: {
            top: 0,
            left: 0,
            data: [],
          },
          tooltip: {
            trigger: 'item',
            formatter: 'nodes: {b0}',
          },
          geo: {
            type: 'map',
            map: 'world',
            roam: true,
            scaleLimit: {
              min: 1.6,
              max: 100,
            },
            center: [0.46, 26.92],
            zoom: 2,

            // scaleLimit.max: 10,   // scorll max
            label: {
              show: false,
            },
            itemStyle: {
              opacity: 1,
              borderColor: '#444444',
              areaColor: '#383838',
              borderWidth: 1,
            },
            emphasis: {
              disabled: true,
              areaColor: '#fff',
              itemStyle: {
                areaColor: '#eee',
              },
            },
          },
          series: [
            // {
            //   name: '',
            //   type: 'effectScatter',
            //   coordinateSystem: 'geo',
            //   data: newIPMap,
            //   // symbolSize: function (val: any) {
            //   //   return val;
            //   // },
            //   rippleEffect: {
            //     brushType: 'fill', //stroke
            //     color: '#BD6FD900',
            //     number: 3,
            //     period: 4,
            //     scale: 2.5,
            //   },
            //   itemStyle: {
            //     color: '#7B00A650',
            //     shadowBlur: 50,
            //     shadowColor: '#7B00A650',
            //   },
            //   zlevel: 1,
            // },
            {
              name: '',
              // type: 'scatter',
              type: 'effectScatter',

              coordinateSystem: 'geo',
              zlevel: 3,
              rippleEffect: {
                brushType: 'stroke',
                number: 2,
                period: 5,
                scale: 2.5,
              },
              itemStyle: {
                borderColor: '#7B00A6',
                borderWidth: 2,
                color: '#BD6FD948',
              },
              data: newIPMap,
            },
          ],
          textStyle: {
            fontSize: 12,
          },
        };

        myEchart.setOption(option);
      }
    });
    return {
      isWhell,
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
