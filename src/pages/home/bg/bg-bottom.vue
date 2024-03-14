<template>
  <div class="bg-bottom">
    <div class="bg-bottom-color"></div>
    <div class="bg-bottom-overlay"></div>
  </div>
</template>
<style scoped>
.bg-bottom {
  display: block;
  position: absolute;
  left: 50%;
  bottom: 0;
  width: 3200px;
  padding-top: 420px;
  margin-left: -1600px;
  background-image: url(/src/assets/home_bg_bottom.svg);
  background-size: 100%;
}
.bg-bottom-color {
  position: absolute;
  width: 800px;
  height: 800px;
  left: 50%;
  top: 0;
  transform: translate(-50%, 0);
  border-radius: 100%;
  background-image: conic-gradient(
    from 180deg at 50% 50%,
    rgba(128, 0, 255, 0.4) -66.85deg,
    #67d1ff 28.65deg,
    rgba(128, 0, 255, 0.6) 293.15deg,
    #67d1ff 388.65deg
  );
  filter: blur(200px);
  opacity: 0.4;
}
.bg-bottom-overlay {
  position: absolute;
  width: 1200px;
  height: 600px;
  left: 50%;
  bottom: 0;
  transform: translate(-50%, 50%);
  background-image: conic-gradient(
    from -45.96deg at 50% 50%,
    rgba(255, 255, 255, 0) 0deg,
    rgba(255, 255, 255, 0.965183) 8.35deg,
    rgba(255, 255, 255, 0) 16.65deg,
    rgba(255, 255, 255, 0.52) 24.43deg,
    rgba(255, 255, 255, 0) 33.99deg,
    rgba(255, 255, 255, 0.48) 44.47deg,
    rgba(255, 255, 255, 0.843682) 54.89deg,
    rgba(217, 217, 217, 0) 65.39deg,
    rgba(255, 255, 255, 0) 77.32deg,
    rgba(255, 255, 255, 0.29) 87.18deg,
    rgba(255, 255, 255, 0.725655) 97.91deg,
    rgba(255, 255, 255, 0) 107.22deg,
    rgba(217, 217, 217, 0) 116.64deg,
    rgba(255, 255, 255, 0.619668) 130.79deg,
    rgba(217, 217, 217, 0) 137.43deg,
    rgba(255, 255, 255, 0) 315.28deg,
    rgba(255, 255, 255, 0) 323.03deg,
    rgba(255, 255, 255, 0.383339) 337.2deg,
    rgba(255, 255, 255, 0) 348.41deg,
    rgba(255, 255, 255, 0) 360deg
  );
  mix-blend-mode: overlay;
  filter: blur(30px);
  opacity: 0.72;
}
</style>
