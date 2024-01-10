<template>
  <div class="models-card" :style="{ background: item.background }" @click="onPressItem(item)">
    <img :src="item.cover" style="width: 100%; height: 100%; object-fit: cover" />
    <div class="models-card-info">
      <div class="models-card-title">{{ item.model_name }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent, watch } from 'vue';
import { useMessage } from 'naive-ui';

export default defineComponent({
  props: {
    item: { type: Object, default: {} },
  },

  setup(props) {
    const item = ref(props.item);
    const message = useMessage();

    const onPressItem = (item: any) => {
      if (!item.model_sn) {
        message.warning('The model cannot be run');
        return;
      }
      window.open(`https://emchub.ai/#/models/${item.model_sn}`, '_blank');
    };

    watch(
      () => props.item,
      (val, oldVal) => {
        if (val) {
          const random = Math.floor(Math.random() * 3);
          const list = [
            'linear-gradient(180deg, rgba(24, 15, 122, 0.28) 0%, rgba(134, 28, 185, 0.28) 100%)',
            'linear-gradient(180deg, rgba(15, 71, 122, 0.28) 0%, rgba(85, 43, 71, 0.28) 100%)',
            'linear-gradient(180deg, rgba(122, 15, 105, 0.28) 0%, rgba(105, 83, 50, 0.28) 100',
          ];
          val.background = list[random];
        }
      },
      { immediate: true }
    );

    return { item, onPressItem };
  },
});
</script>
<style scoped>
.models-card {
  position: relative;
  width: 100%;
  height: 400px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  cursor: pointer;
}

.models-card-info {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 12px 12px 14px;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(2px);
  border-radius: 0px 0px 6px 6px;
}
.models-card-title {
  color: #fff;
  font-size: 14px;
  font-weight: 500;
  line-height: 14px;
}
.models-card-desc {
  margin-bottom: 16px;
  color: #e9e9e9;
  font-size: 12px;
  font-weight: 400;
  line-height: 18px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.models-card-owner {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
.models-card-owner-avtatr {
  width: 18px;
  height: 18px;
  border-radius: 18px;
  margin-right: 6px;
}
.models-card-owner-name {
  color: #d8d8d8;
  font-size: 12px;
  font-weight: 400;
  line-height: 18px;
}

.models-card-type {
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 14px;
  left: 14px;
  height: 18px;
  line-height: 18px;
  padding: 0px 12px;
  border-radius: 32px;
  background: rgba(0, 0, 0, 0.66);
}
.models-card-type-span {
  color: #fff;
  font-size: 12px;
  font-weight: 400;
  line-height: 12px;
}

.models-card-run {
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 16px;
  right: 16px;
  width: 66px;
  height: 32px;
  padding: 0px 12px;
  border-radius: 0px 8px 8px 0;
  background: linear-gradient(90deg, #5a9ff0 0%, #c757bd 73%, #eb71b1 100%);
  cursor: pointer;
}
.models-card-run-image {
  width: 14px;
  height: 14px;
  margin-right: 4px;
}
.models-card-type-span {
  color: #fff;
  font-size: 12px;
  font-weight: 400;
  line-height: 12px;
}
</style>
