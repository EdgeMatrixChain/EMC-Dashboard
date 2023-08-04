<template>
  <div class="models-card" id="card" ref="card">
    <template v-if="!item.hash">
      <img src="@/assets/icon_not_image.png" width="240" height="240" />
    </template>
    <template v-else>
      <img src="@/assets/icon_not_image.png" width="240" height="240" />
    </template>
    <div class="models-card-info">
      <div class="models-card-title">{{ item.model_name }}</div>
      <!-- <div class="models-card-desc">A powerful model created by XpucT that is great for both photorealism and artistic creations.</div>
        <div class="models-card-owner">
          <img
            class="models-card-owner-avtatr"
            src="https://ts1.cn.mm.bing.net/th/id/R-C.c504f926a149bad6fcc39bc7e372c1cb?rik=y7XwtY%2bjNhSymw&riu=http%3a%2f%2f5b0988e595225.cdn.sohucs.com%2fimages%2f20190916%2fa3f5d42c09dd48f38e54dd33d22e4b8e.gif&ehk=QiEQyZV4iTSdupzA9e0D%2bQtuU9DhjQ32LZuOhRDpLAE%3d&risl=&pid=ImgRaw&r=0"
          />
          <div class="models-card-owner-name">Hery</div>
        </div> -->
    </div>
    <!-- <div class="models-card-type"><span class="models-card-type-span">LORA</span></div> -->
    <template v-if="modelName === item.model_name">
      <a :href="'https://6tq33-2iaaa-aaaap-qbhpa-cai.icp0.io/#/txt2img?nodeid=' + nodeID" target="_blank">
        <div class="models-card-run">
          <img class="models-card-run-image" src="@/assets/icon_run.svg" />
          <span class="models-card-type-span">RUN</span>
        </div>
      </a>
    </template>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent, onMounted, watch, nextTick } from 'vue';
export default defineComponent({
  props: {
    item: { type: Object, default: {} },
    modelName: { type: String, default: '' },
    nodeID: { type: String, default: '' },
  },

  /* background: linear-gradient(180deg, rgba(24, 15, 122, 0.28) 0%, rgba(134, 28, 185, 0.28) 100%); */

  setup(props) {
    const item = ref(props.item);
    const modelName = ref(props.modelName);
    const nodeID = ref(props.nodeID);
    onMounted(() => {
      const random = Math.floor(Math.random() * 3);
      nextTick(() => {
        // const card = ref<any>(null);
        const card = document.getElementById('card') || '';

        const list = [
          'linear-gradient(180deg, rgba(24, 15, 122, 0.28) 0%, rgba(134, 28, 185, 0.28) 100%)',
          'linear-gradient(180deg, rgba(15, 71, 122, 0.28) 0%, rgba(85, 43, 71, 0.28) 100%)',
          'linear-gradient(180deg, rgba(122, 15, 105, 0.28) 0%, rgba(105, 83, 50, 0.28) 100',
        ];
        if (!card) return;
        card.style.background = list[random];
      });
    });

    return { item, modelName, nodeID };
  },
});
</script>
<style scoped>
.models-card {
  position: relative;
  width: 300px;
  height: 400px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.models-card-info {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 12px 12px 14px;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(2px);
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
