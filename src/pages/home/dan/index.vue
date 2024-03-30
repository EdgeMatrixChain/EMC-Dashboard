<template>
  <div class="content">
    <SectionHeader>Daily Active Node</SectionHeader>
    <div class="content-body w-full">
      <div class="bar-container">
        <Bar :data="data" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import moment from 'moment';
import Bar from './bar/index.vue';
import SectionHeader from '@/components/section-header.vue';
import { getDAN } from '@/apis';
import { useIsMobile } from '@/composables/use-screen';
const isMobile = useIsMobile();
const data = ref<any[]>([]);
onMounted(async () => {
  const days = isMobile.value ? 7 : 14;
  const daybegin = moment().subtract(days, 'day').utc().format('YYYY-MM-DD');
  const dayend = moment().utc().format('YYYY-MM-DD');
  data.value = await getDAN({ daybegin, dayend });
});
</script>

<style scoped>
.content {
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: 8px 0;
}

.content-body {
  width: 100%;
}

.bar-container {
  width: 100%;
  height: 240px;
  position: relative;
}

@media (min-width: 640px) {
  .content {
    gap: 16px 0;
  }
  .bar-container {
    height: 36px;
    height: 400px;
  }
}
</style>
