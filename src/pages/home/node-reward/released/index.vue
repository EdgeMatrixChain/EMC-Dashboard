<template>
  <div class="released">
    <div class="released-header">
      <span class="released-header-title">Released Node Rewards</span>
    </div>
    <div class="released-body">
      <div class="released-value">
        <div class="released-value-icon"></div>
        <template v-if="releasedLoading">
          <NSkeleton :width="40" :height="12" style="display: inline-block" />
        </template>
        <template v-else>
          <span class="released-value-text">{{ releasedReword }}</span>
          <span class="released-value-unit">EMC</span>
        </template>
      </div>
      <div class="released-epoch">
        <span class="released-epoch-text-1">{{ epochReward }}EMC / Epoch</span>
        <span class="released-epoch-text-2">{{ periodName }} {{ periodCurrentDays }}/{{ periodTotalDays }} Days</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { NSkeleton } from 'naive-ui';
import ScheduleData from '../data';
import { getNodeRewards } from '@/apis';
import { toFixedClip } from '@/tools/format-number';
const releasedLoading = ref(false);
const releasedReword = ref('');
const epochReward = ref(0);
const periodName = ref('');
const periodTotalDays = ref(0);
const periodCurrentDays = ref(0);

function initEpoch() {
  const now = new Date();
  const period = ScheduleData.data.find((item) => now >= item.beginDate && now < item.endDate);
  if (!period) return;
  periodName.value = period.name;
  periodTotalDays.value = period.days;
  const diffTime = now.getTime() - period.beginDate.getTime();
  periodCurrentDays.value = Math.floor(diffTime / 86400000);
  epochReward.value = period.epochReward;
}

async function initReleased() {
  releasedLoading.value = true;
  const resp = await getNodeRewards();
  releasedLoading.value = false;
  const total = resp.data;
  releasedReword.value = `${toFixedClip(total, 4)}`;
}
onMounted(async () => {
  initEpoch();
  initReleased();
});

onUnmounted(() => {});
</script>

<style scoped>
.released {
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: 8px 0;
}

.released-header {
}

.released-header-title {
  /* font-family: Oxanium; */
  font-size: 16px;
  font-weight: 400;
  color: #eeddff;
}

.released-body {
  display: flex;
  flex-direction: column;
  gap: 8px 0;
}

.released-value {
  line-height: 1.2;
}

.released-value-icon {
  display: inline-block;
  --clip-size: 8px;
  width: 20px;
  height: 26px;
  background-image: linear-gradient(204deg, #04d5ef 0%, #5d4ddd 168%);
  clip-path: polygon(0 0, calc(100% - var(--clip-size)) 0, 100% var(--clip-size), 100% 100%, 0 100%);

  margin-right: 8px;
  vertical-align: sub;
}

.released-value-text {
  font-size: 24px;
  font-weight: 500;
  font-family: Oxanium;
}

.released-value-unit {
  font-size: 12px;
  font-weight: 500;
  color: #69656f;
}

.released-epoch {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.released-epoch-text-1,
.released-epoch-text-2 {
  font-size: 14px;
  font-weight: 500;
  font-family: Oxanium;
}
.released-epoch-text-2 {
  color: var(--text-color2);
}
@media (min-width: 640px) {
  .released-body {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 0;
  }
  .released-value-text {
    font-size: 24px;
  }

  .released-epoch {
    align-items: flex-end;
  }

  .released-epoch-text-1,
  .released-epoch-text-2 {
    font-size: 18px;
    font-weight: 500;
  }
}
</style>
