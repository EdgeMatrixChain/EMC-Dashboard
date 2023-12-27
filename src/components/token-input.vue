<template>
  <NInput :value="value" placeholder="0.0" size="large" style="width: 100%" @update:value="onUpdateValue" />
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import type { PropType } from 'vue';
import { NInput } from 'naive-ui';

export default defineComponent({
  name: 'token-input',
  components: { NInput },
  props: {
    value: { type: String as PropType<string>, default: '' },
  },
  emits: ['update:value'],
  setup(props, ctx) {
    return {
      onUpdateValue(value: string) {
        ctx.emit('update:value', value);
      },
    };
  },
});
</script>
