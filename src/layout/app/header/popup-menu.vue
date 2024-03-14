<template>
  <NDropdown :show="visible" :options="options" size="large" trigger="click" @clickoutside="onPressOutSide">
    <NButton type="default" circle strong quaternary size="large" @click="onPressToggle">
      <template #icon>
        <NIcon size="28">
          <IconMenu />
        </NIcon>
      </template>
    </NButton>
  </NDropdown>
</template>
<script lang="ts" setup>
import { ref, watch, PropType, h } from 'vue';
import { NDropdown, NButton, NIcon, NText } from 'naive-ui';
import { RouterLink } from 'vue-router';
import { MenuSharp as IconMenu } from '@vicons/ionicons5';

type TabItem = {
  id: number;
  label: string;
  key: string;
};

const props = defineProps({
  configs: { type: Array as PropType<TabItem[]>, default: () => [] },
});

const options = ref<any[]>([]);
const visible = ref<boolean>(false);

const renderOption = (item: TabItem) => {
  return h(
    RouterLink,
    { to: { path: item.key } },
    {
      default: () =>
        h(
          'div',
          {
            class: 'w-[240px] p-[16px] cursor-pointer select-none hover:bg-[#212121]',
            onClick: () => onPressItem(item),
          },
          h(NText, {}, { default: () => item.label })
        ),
    }
  );
};

watch(
  () => props.configs,
  (configs) => {
    options.value = configs.map((item) => ({
      key: item.key,
      type: 'render',
      render: () => renderOption(item),
    }));
  },
  { immediate: true }
);

function onPressToggle() {
  visible.value = !visible.value;
}

function onPressOutSide() {
  visible.value = false;
}

function onPressItem(item: TabItem) {
  visible.value = false;
}
</script>
<style scoped></style>
