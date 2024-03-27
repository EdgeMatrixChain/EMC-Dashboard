<template>
  <template v-if="tag === 'a'">
    <a class="btn" :href="href" target="_blank" @click.stop="onPress">
      <slot>
        <img class="btn-icon" :src="icon" :style="{ width: `${iconSize}px` }" />
      </slot>
    </a>
  </template>
  <template v-else>
    <div class="btn" @click.stop="onPress">
      <slot>
        <img class="btn-icon" :src="icon" :style="{ width: `${iconSize}px` }" />
      </slot>
    </div>
  </template>
</template>
<script lang="ts" setup>
const props = defineProps({
  tag: { type: String },
  href: { type: String },
  icon: { type: String },
  iconSize: { type: Number, default: 16 },
});
const emits = defineEmits(['press']);
function onPress() {
  emits('press');
}
</script>
<style scoped>
.btn {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: linear-gradient(215.26deg, #04d5ef 11.75%, #5d4ddd 159.38%);
}

.btn:hover {
  cursor: pointer;
  opacity: 0.8;
}

.btn-icon {
  width: 16px;
}
</style>
