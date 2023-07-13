<template>
  <NLayout position="absolute">
    <div>Auth</div>
  </NLayout>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import { NLayout } from 'naive-ui';
export default defineComponent({
  name: 'auth',
  components: { NLayout },
});
</script>

<style scoped></style>
