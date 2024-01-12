<template>
  <div id="logo">
    <div class="rotate">
      <div class="translateY">
        <div class="translateX">
          <img class="umbrella" src="@/assets/airdrop/umbrella.svg" alt="" />
        </div>
      </div>
      <div class="box-translateY">
        <div class="box-translateX">
          <img class="box" src="@/assets/airdrop/box.svg" @click="onPress" />
          <!-- <img class="ribbon" src="@/assets/airdrop/gift-box-ribbon.svg" /> -->
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted } from 'vue';

const emits = defineEmits(['press']);
const onPress = () => {
  emits('press');
};

onMounted(() => {
  const rotate = document.querySelector('.rotate') as HTMLElement;
  // const box = document.querySelector('.box-translateY') as HTMLElement;

  if (rotate) {
    const rotateRect = rotate.getBoundingClientRect();

    const distanceToTop = rotateRect.top;

    setTimeout(function () {
      window.scrollTo({
        top: distanceToTop,
        behavior: 'smooth',
      });
    }, 8000);
  }
});
</script>
<style scoped>
.box {
  width: 24.875rem;
  height: 22.25rem;
  cursor: pointer;
}
.umbrella {
  width: 24rem;
  height: 30.25rem;
  transform: translate(0.4375rem, 4.75rem);
}

#logo {
  position: absolute;
  top: 20%;
  left: calc(50% - 12rem);
  z-index: 99;
}
.rotate {
  transform-origin: 95% 5%;
  animation: rotate 10s cubic-bezier(0.5, 0, 0.5, 1) forwards;
}

.translateX {
  transform-origin: top center;
  animation: translateX 8s infinite cubic-bezier(0.5, 0, 0.5, 1) forwards;
}

.translateY {
  position: relative;
  z-index: 10;
  transform-origin: top center;
  animation: translateY 10s cubic-bezier(0.5, 0, 0.5, 1) forwards;
}

.box-translateX {
  transform-origin: top center;
  animation: box-translateX 8s cubic-bezier(0.5, 0, 0.5, 1) forwards;
}

.box-translateY {
  position: relative;
  transform-origin: top center;
  animation: box-translateY 10s cubic-bezier(0.5, 0, 0.5, 1) forwards;
}

@keyframes rotate {
  0%,
  30%,
  60% {
    transform: rotate(-10deg);
  }
  15%,
  45% {
    transform: rotate(20deg);
  }
  75%,
  100% {
    transform: rotate(0deg);
  }
}

@keyframes translateX {
  0%,
  100% {
    transform: translateX(0%);
  }
  25% {
    transform: translateX(-40%);
  }
  50% {
    transform: translateX(-20%);
  }
  75% {
    transform: translateX(0%);
  }
}

@keyframes translateY {
  0% {
    top: -125rem;
  }
  75% {
    top: 0px;
  }
  100% {
    top: -125rem;
  }
}

@keyframes box-translateX {
  0%,
  100% {
    transform: translateX(0%);
  }
  25% {
    transform: translateX(-40%);
  }
  50% {
    transform: translateX(-20%);
  }
  75% {
    transform: translateX(0%);
  }
}

@keyframes box-translateY {
  0% {
    top: -125rem;
  }
  75% {
    top: 0px;
  }
}
.ribbon {
  position: absolute;
  top: -100px;
  right: calc(50% - 26.8125rem);
  width: 838px;
  z-index: 1;
  transform-origin: bottom center;
  animation: ribbon 1s ease;
}

@keyframes ribbon {
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
}
</style>
