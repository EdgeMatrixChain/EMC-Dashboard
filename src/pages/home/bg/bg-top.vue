<template>
  <div class="bg-top">
    <div class="bg-top-overlay"></div>
  </div>
</template>
<style scoped>
.bg-top {
  display: block;
  position: absolute;
  left: 50%;
  top: 0;
  width: 3200px;
  padding-top: 420px;
  margin-left: -1600px;
  background-image: url(/src/assets/home_bg_top.svg);
  background-size: 100%;
}
.bg-top-overlay {
  position: absolute;
  width: 80vw;
  height: 200px;
  border-radius: 100%;
  left: 50%;
  top: 220px;
  transform: translate(-50%, 0);
  background-image: linear-gradient(180deg, rgba(255, 174, 223, 0.3744) 12.31%, rgba(19, 0, 94, 0.1924) 64.89%);
  filter: blur(80px);
  opacity: 0.4;
}
</style>
