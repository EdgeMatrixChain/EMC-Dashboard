<template>
  <canvas id="canvas"></canvas>
</template>

<script setup lang="ts">
import { nextTick, onMounted } from 'vue';
import { ClassicalNoise } from './LWGOWR.js';

onMounted(() => {
  nextTick(() => {
    let canvas = document.getElementById('canvas') as HTMLCanvasElement;
    let ctx = canvas.getContext('2d') as CanvasRenderingContext2D,
      perlin = new ClassicalNoise(),
      variation = 0.0025,
      amp = 300,
      variators: any = [],
      max_lines = navigator.userAgent.toLowerCase().indexOf('firefox') > -1 ? 25 : 40,
      canvasWidth: any,
      canvasHeight: any,
      start_y: any;

    for (var i = 0, u = 0; i < max_lines; i++, u += 0.02) {
      variators[i] = u;
    }

    function draw() {
      ctx.shadowColor = 'rgba(43, 205, 255, 1)';
      ctx.shadowBlur = 0;
      for (var i = 0; i <= max_lines; i++) {
        ctx.beginPath();
        ctx.moveTo(0, start_y);
        for (var x = 0; x <= canvasWidth; x++) {
          var y = perlin.noise(x * variation + variators[i], x * variation, 0);
          ctx.lineTo(x, start_y + amp * y);
        }
        ctx.closePath();
        variators[i] += 0.005;
      }
    }

    (function init() {
      resizeCanvas();
      animate();
      window.addEventListener('resize', resizeCanvas);
    })();

    function animate() {
      ctx.clearRect(0, 0, canvasWidth, canvasHeight);
      draw();
      requestAnimationFrame(animate);
    }

    function resizeCanvas() {
      (canvasWidth = document.documentElement.clientWidth), (canvasHeight = document.documentElement.clientHeight);

      canvas.setAttribute('width', canvasWidth);
      canvas.setAttribute('height', canvasHeight);

      start_y = canvasHeight / 2;
    }
  });
});
</script>

<style scoped>
#canvas {
  width: 100%;
  position: absolute;
  left: 0;
  top: 0;
}
</style>
