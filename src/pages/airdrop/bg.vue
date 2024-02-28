<template>
  <div class="background">
    <img class="background-img" src="@/assets/airdrop/bg.png" />
    <template v-for="widget in widgets">
      <img :src="widget.icon" :style="widget.style" />
    </template>
  </div>
</template>

<script setup lang="ts">

import WidgetBall from '@/assets/airdrop/ball.png';
import WidgetMoon from '@/assets/airdrop/moon.png';
import WidgetMeteor from '@/assets/airdrop/meteor.png';
import WidgetCloud from '@/assets/airdrop/cloud.png';
type Widget = {
  icon: string;
  style: any;
};
const widgets: Widget[] = [
  { icon: WidgetMoon, style: { position: 'absolute', left: '40%', top: '0', width: '120px' } },
  { icon: WidgetBall, style: { position: 'absolute', left: '20%', top: '12%', width: '48px' } },
  { icon: WidgetMeteor, style: { position: 'absolute', left: '80%', top: '8%', width: '80px' } },
  { icon: WidgetCloud, style: { position: 'absolute', left: '0', bottom: '0', width: '100%', objectFit: 'cover' } },
];
</script>

<style scoped>
.background {
  position: fixed;
  width: 100%;
  height: 100vh;
  min-height: 800px;
  left: 0;
  top: 0;
  object-fit: cover;
}
.background-img {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  object-fit: cover;
}
</style>
