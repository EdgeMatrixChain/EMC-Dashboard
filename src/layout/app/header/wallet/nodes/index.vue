<template>
  <div>
    <template v-if="loading">
      <NSpace align="center" justify="center" vertical :size="[0, 16]" :wrap-item="false" :wrap="false" style="height: 80px">
        <NSpin />
      </NSpace>
    </template>
    <template v-else>
      <NSpace vertical :size="[0, 16]" :wrap-item="false" :wrap="false">
        <template v-for="nodeId in nodeIds">
          <Item :node-id="nodeId" @press="() => onPressItem(nodeId)" />
        </template>
      </NSpace>
    </template>
  </div>
</template>
<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { NSpace, useMessage, NText, NSpin } from 'naive-ui';
import { useRoute, useRouter, RouterLink } from 'vue-router';
import { useETHUserStore } from '@/stores/eth-user';
import { http } from '@/tools/http';
import Item from './item.vue';

const emits = defineEmits(['press-item']);

const ethUserStore = useETHUserStore();
const nodeIds = ref<string[]>([]);

const loading = ref(false);

async function init() {
  const account = ethUserStore.account0;
  loading.value = true;
  const resp = await http.get({
    url: '/nodesign/list',
    data: { owner: account },
  });
  loading.value = false;
  const _list = resp.data || [];
  nodeIds.value = _list.map((item: any) => item.nodeId);
}

onMounted(() => {
  init();
});
function onPressItem(nodeId: string) {
  emits('press-item', nodeId);
}
</script>
<style scoped></style>
