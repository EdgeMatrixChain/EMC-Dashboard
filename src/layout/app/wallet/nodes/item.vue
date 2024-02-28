<template>
  <NCard class="cursor-pointer" size="small" header-style="padding:0;">
    <NSpace align="center" :wrap-item="false" @click="onPressItem">
      <NSpace vertical class="flex-1" :size="[0, 4]">
        <NSpace align="center" justify="space-between" :wrap-item="false" :wrap="false" :size="[8, 0]">
          <div class="whitespace-nowrap text-ellipsis overflow-hidden">
            <NText class="text-[14px]">{{ Utils.formatAddress(nodeId, 6) }}</NText>
          </div>
        </NSpace>
        <template v-if="rewardLoading">
          <NSkeleton :width="40" :height="12" />
        </template>
        <template v-else>
          <NSpace align="center" :wrap-item="false" :wrap="false" :size="[4, 0]">
            <img class="w-[16px] h-[16px] rounded-[16px]" :src="IconEMC" />
            <NText class="text-[14px]">{{ toFixedClip(ethers.formatUnits(reward, 18)) }}</NText>
          </NSpace>
        </template>
      </NSpace>
      <NIcon size="16">
        <IconArrowRight />
      </NIcon>
    </NSpace>
  </NCard>
</template>
<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { NSpace, NText, NCard, NIcon, NSkeleton } from 'naive-ui';
import { useRouter } from 'vue-router';
import IconEMC from '@/assets/token/emc.white.png';
import { ethers } from 'ethers';
import { toFixedClip } from '@/tools/format-number';
import { Utils } from '@/tools/utils';
import { ChevronForwardSharp as IconArrowRight } from '@vicons/ionicons5';
import { queryReward } from '@/apis';

const props = defineProps({
  nodeId: { type: String, default: '' },
});
const emits = defineEmits(['press']);

const router = useRouter();

const reward = ref<bigint>(0n);
const rewardLoading = ref(false);

async function init() {
  rewardLoading.value = true;
  const { currentReward } = await queryReward(props.nodeId);
  rewardLoading.value = false;
  reward.value = currentReward;
}

function onPressItem() {
  router.push({ name: 'node-detail', params: { id: props.nodeId } });
  emits('press');
}

onMounted(() => {
  init();
});
</script>
<style scoped>
.toggle {
  width: 48px;
  height: 48px;
}
</style>
