<template>
  <div class="page">Awards</div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import { NH4, NTag, NSpin, NButton, NModal } from 'naive-ui';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'market',
  components: {
    NH4,
    NTag,
    NSpin,
    NButton,
    NModal,
  },
  setup() {
    const isLoading = ref(false);
    return {
      isLoading,
    };
  },
});
</script>

<style scoped>
.page {
  min-height: 80vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
