<template>
  <template v-if="tag === 'a'">
    <a class="btn" :href="href" target="_blank" @click.stop="onPress">
      <slot> </slot>
    </a>
  </template>
  <template v-else>
    <div class="btn" @click.stop="onPress">
      <slot></slot>
    </div>
  </template>
</template>
<script lang="ts" setup>
const props = defineProps({
  tag: { type: String },
  href: { type: String },
});
const emits = defineEmits(['press']);
function onPress() {
  emits('press');
}
</script>
<style scoped>
.btn {
  display: inline-block;
  --clip-size: 12px;
  overflow: hidden;
  position: relative;
  min-width: 80px;
  max-width: 480px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 500;
  color: #ffffff;
  user-select: none;
  transition: opacity 0.2s;
  background-image: linear-gradient(90deg, #2f0593 0%, #861cb9 100%);
  border-radius: 6px;
}

.btn:hover {
  cursor: pointer;
  opacity: 0.8;
}

@media (min-width: 640px) {
  .btn {
    height: 40px;
    font-size: 16px;
  }
}
</style>
