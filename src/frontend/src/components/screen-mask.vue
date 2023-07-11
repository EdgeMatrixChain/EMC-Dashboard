<template>
  <div class="mask">
    <div class="mask-bg"></div>
    <slot></slot>
  </div>
</template>
<style scoped>
.mask {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(30, 30, 30, 0.2);
  backdrop-filter: blur(75px);
  z-index: 1;
}
.mask-bg {
  position: absolute;
  width: 210px;
  height: 210px;
  left: 156px;
  top: 100px;

  background: linear-gradient(
    130.04deg,
    rgba(253, 153, 42, 0.3) 13.45%,
    rgba(125, 81, 220, 0.3) 60.04%,
    rgba(37, 237, 255, 0.3) 88.4%
  );
  filter: blur(50px);
}
</style>
