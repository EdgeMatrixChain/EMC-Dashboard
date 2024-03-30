<template>
  <div class="schedule">
    <div class="schedule-header">
      <span class="schedule-header-title">Node Reward Release Schedule</span>
    </div>
    <div class="schedule-body">
      <Line :data="ScheduleData" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import Line from './line/index.vue';
import ScheduleData from '../data';
</script>

<style scoped>
.schedule {
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: 8px 0;
}

.schedule-header {
}

.schedule-header-title {
  /* font-family: Oxanium; */
  font-size: 16px;
  font-weight: 400;
  color: #eeddff;
}

.schedule-body {
  position: relative;
  height: 360px;
}
</style>
../data
