<template>
  <div class="box">
    <img class="box" src="@/assets/airdrop/box2.svg" />
    <img class="box-star box-star1" src="@/assets/airdrop/star.svg" />
    <img class="box-star box-star2" src="@/assets/airdrop/star.svg" />
    <img class="box-star box-star3" src="@/assets/airdrop/star.svg" />
    <img class="box-star box-star4" src="@/assets/airdrop/star.svg" />

    <div class="box-ball__red box-ball__red1"></div>
    <div class="box-ball__red box-ball__red2"></div>
    <div class="box-ball__red box-ball__red3"></div>
    <div class="box-ball__yellow box-ball__yellow1"></div>
    <div class="box-ball__yellow box-ball__yellow2"></div>
    <div class="box-ball__yellow box-ball__yellow3"></div>
  </div>
</template>
<style scoped>
.box {
  position: relative;
  width: 160px;
  height: 160px;
}

.box {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 160px;
  height: 160px;
  z-index: 1;
}

.box-star {
  position: absolute;
  z-index: 11;
}

.box-star1 {
  top: 10%;
  left: 50%;
  width: 8px;
  height: 8px;
  animation: anim-star 1.2s linear infinite;
}

.box-star2 {
  top: 40%;
  left: 66%;
  width: 9px;
  height: 9px;
  animation: anim-star 1.2s linear 0.2s infinite;
}
.box-star3 {
  top: 43%;
  left: 58%;
  width: 10px;
  height: 10px;
  animation: anim-star 1.2s linear 0.5s infinite;
}
.box-star4 {
  top: 87%;
  left: 54%;
  width: 12px;
  height: 12px;
  animation: anim-star 1.2s linear 0.8s infinite;
}

.box-ball__red {
  background-color: #f76973;
  border-radius: 50%;
  position: absolute;
  z-index: 10;
}
.box-ball__yellow {
  background-color: #f4a821;
  border-radius: 50%;
  position: absolute;
  z-index: 10;
}
.box-ball__red1 {
  top: 50%;
  left: 70%;
  width: 6px;
  height: 6px;
  animation: anim-ball 1s linear 0.2s infinite;
}
.box-ball__red2 {
  top: 64%;
  left: 20%;
  width: 8px;
  height: 8px;
  animation: anim-ball 1s linear 0.4s infinite;
}
.box-ball__red3 {
  top: 74%;
  left: 80%;
  width: 9px;
  height: 9px;
  animation: anim-ball 1s linear 0.6s infinite;
}
.box-ball__yellow1 {
  top: 0%;
  left: 68%;
  width: 4px;
  height: 4px;
  animation: anim-ball 1s linear 0.1s infinite;
}
.box-ball__yellow2 {
  top: 24%;
  left: 90%;
  width: 12px;
  height: 12px;
  animation: anim-ball 1s linear 0.3s infinite;
}
.box-ball__yellow3 {
  top: 86%;
  left: 40%;
  width: 6px;
  height: 6px;
  animation: anim-ball 1s linear 0.5s infinite;
}

@keyframes anim-star {
  0%,
  80%,
  100% {
    transform: scale(0);
  }

  40% {
    transform: scale(1.4);
  }
}
@keyframes anim-ball {
  0%,
  80%,
  100% {
    transform: scale(0);
  }

  40% {
    transform: scale(1);
  }
}
</style>
