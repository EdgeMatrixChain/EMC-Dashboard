<template>
  <NSpace class="section" vertical :wrap-item="false" :size="[0, 16]">
    <div class="section-header">
      <span class="section-header-title">Distribution of Tokens</span>
    </div>
    <NSpace class="section-body w-full" :wrap-item="false" :wrap="false" :size="[16, 0]">
      <div class="w-[60%] pt-[60%] relative">
        <Pie :data="data" />
      </div>
      <div class="w-[40%] pt-[60%] relative">
        <div class="scroller-wrapper absolute w-[100%] h-[100%] top-0 left-0">
          <NScrollbar class="w-[100%] h-[100%]" trigger="hover">
            <NSpace class="pie-badge flex-1" vertical :wrap-item="false" :size="[0, 0]">
              <NSpace class="pie-badge-content px-[16px] py-[16px]" vertical :wrap-item="false" :size="[0, 8]">
                <template v-for="item in data">
                  <NSpace class="py-[6px]" vertical :wrap-item="false" :size="[0, 8]">
                    <NSpace class="leading-[1]" align="center" :wrap="false" :wrap-item="false" :size="[8, 0]">
                      <div class="bg-[#ff2200] w-[2px] h-[12px] rounded-sm" :style="{ 'background-color': item.color }"></div>
                      <span class="text-[12px] font-[400]">{{ item.name }}</span>
                    </NSpace>
                    <NSpace class="pl-[10px]" align="center" :wrap-item="false" :size="[0, 8]" :wrap="false">
                      <span class="text-[16px] font-[500] pie-badge-item-value">{{ formatNumber(item.value) }}</span>
                      <span class="pie-badge-item-unit">&nbsp;EMC</span>
                    </NSpace>
                  </NSpace>
                </template>
              </NSpace>
            </NSpace>
          </NScrollbar>
        </div>
      </div>
    </NSpace>
  </NSpace>
</template>

<script lang="ts" setup>
import { ref, onMounted, watch, PropType, onUnmounted } from 'vue';
import { NSpace, NScrollbar } from 'naive-ui';
import Pie from './pie/index.vue';
import { formatNumber } from '@/tools/format-number';
// import { useIsMobile } from '@/composables/use-screen';
const data = ref([
  { value: 200000000, name: 'Transaction Reward', color: '#5470c6' },
  { value: 150000000, name: 'Foundation/Treasury', color: '#91cc75' },
  { value: 150000000, name: 'Founding Developer Team', color: '#fac858' },
  { value: 150000000, name: 'Developer Reward', color: '#ee6666' },
  { value: 100000000, name: 'Public Sale', color: '#73c0de' },
  { value: 100000000, name: 'Node Reward', color: '#3ba272' },
  { value: 100000000, name: 'VC Investors', color: '#fc8452' },
  { value: 20000000, name: 'Governance Reward', color: '#9a60b4' },
  { value: 30000000, name: 'Airdrop', color: '#ea7ccc' },
]);
onMounted(async () => {});

onUnmounted(() => {});
</script>

<style scoped>
.section {
  position: relative;
  overflow: hidden;
}

.section-header {
}

.section-header-title {
  font-family: Oxanium;
  font-size: 24px;
  font-weight: 500;
}

.scroller-wrapper {
  box-sizing: border-box;
}

.section-body {
}

.pie-badge {
  background-color: rgba(0, 0, 0, 0.1);
  height: 100%;
}

.pie-badge-content {
}

.pie-badge-item-value {
  font-family: Oxanium;
}

.pie-badge-item-unit {
  color: #69656f;
  font-size: 12px;
  font-weight: 500;
}
</style>
