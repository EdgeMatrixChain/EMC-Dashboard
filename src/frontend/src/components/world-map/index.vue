<template>
  <div class="chart-map">
    <div id="chart-container" :style="{ width: '1400px', height: '440px' }"></div>
    <template v-if="isWhell">
      <div class="chart-mask">HHHHHHHHHHHHHHHHHHHHHHHHHHHH</div>
    </template>
  </div>
</template>

<script lang="ts">
import { onMounted, defineComponent, ref } from 'vue';
import * as echarts from 'echarts';
import './map/js/world.js';
import { Http } from '@/tools/http';

// import 'echarts/map/js/china.js';
const http = Http.getInstance();

export default defineComponent({
  setup() {
    const isWhell = ref(false);

    onMounted(async () => {
      const myEcharts: any = document.getElementById('chart-container');
      const resp = await http.get({ url: 'https://api.edgematrix.pro/api/v1/ipmap' });
      const IPMap = resp.data || [];
      const newIPMap: any = [];
      IPMap.forEach((item: any) => {
        const data = {
          name: item.nodes,
          value: [item.longitude, item.latitude],
          symbolSize: item.nodes > 30 ? 30 : item.nodes,
        };
        newIPMap.push(data);
      });

      if (typeof myEcharts !== null) {
        let myEchart = echarts.init(myEcharts);

        let option = {
          legend: {
            top: 0,
            left: 0,
            data: [],
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
            // top: 0,
            // left: 0,
            // right: 0,
            // bottom: 0,
            // scaleLimit.max: 10,   // scorll max
            label: {
              show: false,
            },
            itemStyle: {
              opacity: 0.6,
              borderColor: '#444444',
              areaColor: '#383838',
              borderWidth: 1,
            },
            emphasis: {
              disabled: false,
              // focus: 'self',
              areaColor: '#fff',
              label: {
                show: false,
              },
              itemStyle: {
                areaColor: '#eee',
              },
            },
          },
          series: [
            {
              name: 'qiumanzou',
              type: 'effectScatter',
              coordinateSystem: 'geo',
              data: newIPMap,
              // symbolSize: function (val: any) {
              //   return val[2] / 1;
              // },

              showEffectOn: 'render',
              rippleEffect: {
                brushType: 'stroke',
                color: '#BD6FD948',
                number: 3,
                period: 4,
                scale: 2.5,
              },
              hoverAnimation: true,
              label: {
                formatter: '{b}',
                position: 'right',
                show: false,
              },
              itemStyle: {
                color: '#7B00A672', // 圆点颜色
                shadowBlur: 10,
                shadowColor: '#7B00A6',
              },
              zlevel: 1,
            },
            // {
            //   name: '',
            //   type: 'scatter',
            //   coordinateSystem: 'geo',
            //   // legendHoverLink: true,
            //   zlevel: 3,
            //   rippleEffect: {
            //     brushType: 'fill',
            //   },
            //   label: {
            //     color: '#000',
            //     show: true,
            //     position: 'top',
            //     formatter: '{b}',
            //   },
            //   itemStyle: {
            //     borderColor: '#7B00A6',
            //     borderWidth: 2,
            //     color: '#BD6FD948',
            //   },
            //   data: newIPMap,
            // },
          ],
          textStyle: {
            fontSize: 12,
          },
        };

        // console.log(myEcharts);
        // myEcharts.addEventListener('mouseover', function (event: any) {
        //   console.log('Mouse is over the element!');
        //   myEcharts.addEventListener('mousewheel', handleWheelEvent);
        // });

        // const handleWheelEvent = (event: any) => {
        //   // event.preventDefault();
        //   isWhell.value = true;
        //   console.log('1');

        //   if (event.ctrlKey) {
        //     console.log(1);

        //     isWhell.value = false;
        //   }
        // };

        myEchart.setOption(option);
      }
      // window.addEventListener('resize', function () {});
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
