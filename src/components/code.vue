<template>
  <div class="code-wrapper">
    <div class="code-wrapper-tools">
      <div class="code-wrapper-tools-item">
        <n-popover trigger="hover">
          <template #trigger>
            <n-button tertiary circle @click="onPressCopy">
              <template #icon>
                <n-icon size="14">
                  <CopyOutline />
                </n-icon>
              </template>
            </n-button>
          </template>
          <span>Copying</span>
        </n-popover>
      </div>
      <!-- <div class="code-wrapper-tools-item">
        <n-popover trigger="hover">
          <template #trigger>
            <n-button tertiary circle @click="onPressFold">
              <template #icon>
                <n-icon size="14">
                  <ResizeOutline />
                </n-icon>
              </template>
            </n-button>
          </template>
          <span>Unfold</span>
        </n-popover>
      </div> -->
    </div>
    <n-code :hljs="hljs" :code="code" language="json" show-line-numbers word-wrap />
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, watch, ref } from 'vue';
import { NButton, NCode, NIcon, NPopover, useMessage } from 'naive-ui';
import { CopyOutline, ResizeOutline } from '@vicons/ionicons5';
import copy from 'copy-to-clipboard';
import hljs from 'highlight.js/lib/core';
import json from 'highlight.js/lib/languages/json';
export default defineComponent({
  name: 'Code',
  components: {
    NButton,
    NCode,
    NIcon,
    NPopover,
    CopyOutline,
    ResizeOutline,
  },
  props: {
    code: { type: String, default: '' },
  },
  setup(props) {
    hljs.registerLanguage('json', json);
    const message = useMessage();
    return {
      hljs,
      onPressCopy() {
        copy(props.code);
        message.success('Copied');
      },
      onPressFold() {},
    };
  },
});
</script>
<style scoped>
.code-wrapper {
  position: relative;
  padding: 24px;
  background-color: rgba(200, 200, 200, 0.1);
}
.code-wrapper-tools {
  position: absolute;
  right: 0;
  top: 0;
  padding: 16px;
  display: flex;
  flex-direction: row;
  align-items: center;
}
.code-wrapper-tools__bottom {
  position: absolute;
  right: 0;
  bottom: 0;
  padding: 16px;
  display: flex;
  flex-direction: row;
  align-items: center;
}
.code-wrapper-tools-item:not(:last-child) {
  margin-right: 8px;
}

@media (prefers-color-scheme: light) {
  .code-wrapper {
    background-color: #eee;
  }
}
</style>
