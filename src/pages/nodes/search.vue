<template>
  <div class="search">
    <input class="search-input" :value="value" :disabled="showClear" type="text" placeholder="Search IDs" @input="onInput" @keyup.enter="onEnter" />
    <template v-if="!showClear">
      <div class="search-icon" @click="onSearch">
        <img src="@/assets/icon_search_white.svg" width="12" height="12" />
      </div>
    </template>
    <template v-else>
      <div class="search-icon" @click="onClear">
        <img src="@/assets/icon_close_white.svg" width="12" height="12" />
      </div>
    </template>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { NDropdown } from 'naive-ui';
const emits = defineEmits(['update:value', 'search']);
const props = defineProps({
  value: { type: String },
  showClear: { type: Boolean },
});

function onInput(e: any) {
  emits('update:value', e.target.value);
}

function onEnter() {
  emits('search');
}

function onSearch() {
  emits('search');
}

function onClear() {
  emits('update:value', '');
  emits('search');
}
</script>
<style scoped>
.search {
  display: flex;
  align-items: center;
  display: flex;
  height: 40px;
  padding: 0 12px;
  background-color: #1c2025;
  border-radius: 4px;
  width: 100%;
}

.search-input {
  flex: 1;
  width: 100%;
  height: 100%;
  line-height: 100%;
  border: none;
  outline: none;
  background-color: transparent;
  color: #fff;
}
.search-icon {
  background-color: #821be6ff;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 100%;
}
.search-icon:hover {
  cursor: pointer;
  opacity: 0.8;
}
</style>
