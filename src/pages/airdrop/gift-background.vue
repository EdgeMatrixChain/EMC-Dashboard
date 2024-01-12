<template>
  <template v-for="item in 10">
    <div class="snow">
      <img class="snow-item" src="@/assets/airdrop/umbrella-min.png" />
    </div>
  </template>
</template>

<style scoped>
body {
  background-color: #0e1824;
}

.snow {
  width: 0px;
  height: 0px;
  background-color: pink 10%;
  border-radius: 50%;
  left: 0;
  position: fixed;
  top: -10%;
  z-index: 10;
  user-select: none;
  cursor: default;
  animation-name: snow-fall, snow-shake;
  animation-duration: 10s, 5s;
  animation-timing-function: linear, ease-in-out;
  animation-iteration-count: infinite, infinite;
  animation-play-state: running, running;
}

@keyframes snow-fall {
  0% {
    top: -10%;
    opacity: 0.1;
    transform: translateX(0px);
  }
  40% {
    opacity: 0.3;
    transform: translateX(50px);
  }
  70% {
    opacity: 0.3;
  }
  100% {
    top: 100%;
    opacity: 0.1;
    transform: translateX(0px);
  }
}

@keyframes snow-shake {
  0% {
    transform: translateX(0px);
  }

  50% {
    transform: translateX(50px);
  }
  100% {
    transform: translateX(0px);
  }
}

.snow:nth-of-type(18) {
  left: 5%;
  animation-delay: 2.5s, 7s;
}
.snow:nth-of-type(1) {
  left: 10%;
  animation-delay: 1s, 0.1s;
}
.snow:nth-of-type(2) {
  left: 35%;
  animation-delay: 5s, 0.5s;
}
.snow:nth-of-type(3) {
  left: 40%;
  animation-delay: 4s;
}
.snow:nth-of-type(4) {
  left: 15%;
  animation-delay: 2s;
}
.snow:nth-of-type(5) {
  left: 50%;
  animation-delay: 8s;
}
.snow:nth-of-type(6) {
  left: 5%;
  animation-delay: 6s;
}
.snow:nth-of-type(13) {
  left: 20%;
  animation-delay: 1s;
}
.snow:nth-of-type(7) {
  left: 2%;
  animation-delay: 2.5s;
}
.snow:nth-of-type(8) {
  left: 80%;
  animation-delay: 7s;
}
.snow:nth-of-type(9) {
  left: 15%;
  animation-delay: 3s;
}
.snow:nth-of-type(10) {
  left: 60%;
  animation-delay: 25s;
}
.snow:nth-of-type(11) {
  left: 35%;
  animation-delay: 4s;
}
.snow:nth-of-type(12) {
  left: 98%;
  animation-delay: 6s;
}
.snow:nth-of-type(13) {
  left: 5%;
  animation-delay: 22s;
}
.snow:nth-of-type(14) {
  left: 50%;
  animation-delay: 4s;
}
.snow:nth-of-type(15) {
  left: 85%;
  animation-delay: 14s;
}
.snow:nth-of-type(16) {
  left: 40%;
  animation-delay: 9s;
}
.snow:nth-of-type(17) {
  left: 25%;
  animation-delay: 5s;
}
</style>
