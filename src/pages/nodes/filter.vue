<template>
  <NDropdown :options="options" size="large" trigger="click" :node-props="() => ({ class: 'n-dropdown-option w-[240px] box-border' })" @select="onSelect">
    <div class="filter">
      <img class="filter-icon" src="@/assets/icon_filter.svg" />
      <div class="filter-content">
        <span class="filter-content-text">{{ currentOptionName }}</span>
        <img class="filter-menu-icon" src="@/assets/icon_arrow_down.svg" />
      </div>
    </div>
  </NDropdown>
</template>

<script lang="ts" setup>
import { ref, onMounted, watch } from 'vue';
import { NDropdown } from 'naive-ui';
import { getNodeTypes } from '@/apis';
const props = defineProps({
  value: { type: String },
});
const emits = defineEmits(['update:value']);

const options = ref<any[]>([]);
const currentOptionName = ref('');

const { list: nodeTypeList, map: nodeTypeMap } = getNodeTypes();

function initFilterOption() {
  const map: any = {};
  const options: any[] = [];

  nodeTypeList.forEach((item) => {
    if (map[item.name]) {
      const opt = map[item.name];
      opt.values.push(item.value);
      opt.key = opt.values.join(',');
    } else {
      const opt = { label: item.name, key: String(item.value), values: [item.value] };
      map[item.name] = opt;
      options.push(opt);
    }
  });

  return options;
}
function updateOptionName(val: string) {
  const currentOption = options.value.find((item) => item.key === val);
  currentOptionName.value = currentOption?.label;
}

onMounted(() => {
  options.value = initFilterOption();
  if (props.value) {
    updateOptionName(props.value);
  } else {
    const value = options.value[0].key;
    emits('update:value', value);
  }
});

watch(
  () => props.value,
  (val) => {
    updateOptionName(val || '');
  }
);

function onSelect(key: any) {
  emits('update:value', key);
}
</script>
<style scoped>
.filter {
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  background-color: #1c2025;
  padding: 0 12px;
  border-radius: 4px;
}

.filter:hover {
  cursor: pointer;
}

.filter-icon {
  margin-right: 8px;
  width: 16px;
  height: 16px;
}
.filter-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 40px;
  width: 120px;
}
.filter-content-text {
  color: #ffffff;
}

.filter-content-icon {
  margin-left: 8px;
  width: 16px;
  height: 16px;
}
</style>
