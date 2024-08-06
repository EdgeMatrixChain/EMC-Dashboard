<template>
  <div class="schedule xs:!gap-y-[12px]">
    <div class="schedule-header">
      <span class="schedule-header-title xs:!text-[18px]">Node Reward Release Schedule</span>
    </div>
    <div class="schedule-body emc-card py-[36px]">
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
  gap: 30px 0;
}

.schedule-header {

}

.schedule-header-title {
  /* font-family: Oxanium; */
  font-size: 24px;
  font-weight: 600;
  /* color: #eeddff; */
}

.schedule-body {
  position: relative;
  height: 380px;
}
</style>
