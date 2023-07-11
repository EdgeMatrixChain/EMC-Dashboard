<template>
  <div class="models-page">
    <div class="models-card">
      <img
        class="models-card-cover"
        src="https://ts1.cn.mm.bing.net/th/id/R-C.c504f926a149bad6fcc39bc7e372c1cb?rik=y7XwtY%2bjNhSymw&riu=http%3a%2f%2f5b0988e595225.cdn.sohucs.com%2fimages%2f20190916%2fa3f5d42c09dd48f38e54dd33d22e4b8e.gif&ehk=QiEQyZV4iTSdupzA9e0D%2bQtuU9DhjQ32LZuOhRDpLAE%3d&risl=&pid=ImgRaw&r=0"
      />
      <div class="models-card-info">
        <div class="models-card-title">Deliberate 1.1</div>
        <div class="models-card-desc">
          A powerful model created by XpucT that is great for both photorealism and artistic creations.
        </div>
        <div class="models-card-owner">
          <img
            class="models-card-owner-avtatr"
            src="https://ts1.cn.mm.bing.net/th/id/R-C.c504f926a149bad6fcc39bc7e372c1cb?rik=y7XwtY%2bjNhSymw&riu=http%3a%2f%2f5b0988e595225.cdn.sohucs.com%2fimages%2f20190916%2fa3f5d42c09dd48f38e54dd33d22e4b8e.gif&ehk=QiEQyZV4iTSdupzA9e0D%2bQtuU9DhjQ32LZuOhRDpLAE%3d&risl=&pid=ImgRaw&r=0"
          />
          <div class="models-card-owner-name">Hery</div>
        </div>
      </div>
      <div class="models-card-type"><span class="models-card-type-span">LORA</span></div>
      <div class="models-card-run">
        <div class="models-card-run-image">
          <svg width="13" height="14" viewBox="0 0 13 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M2.5 13.0622L11.5 7.86603C12.1667 7.48113 12.1667 6.51888 11.5 6.13398L2.5 0.937822C1.83333 0.552922 1 1.03405 1 1.80385L0.999999 12.1962C0.999999 12.966 1.83333 13.4471 2.5 13.0622Z"
              stroke="white"
            />
          </svg>
        </div>
        <span class="models-card-type-span">RUN</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {} from 'vue';
</script>

<style scoped>
.models-card {
  position: relative;
  width: 300px;
  height: 400px;
  border-radius: 6px;
  overflow: hidden;
}
.models-card-cover {
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
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
  margin-bottom: 4px;
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
  display: flex;
  align-items: center;
  justify-content: center;
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
