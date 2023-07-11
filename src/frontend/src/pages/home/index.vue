<template>
  <div class="page">
    <div class="card-body">
      <template v-for="index in 4">
        <div class="card-body-item">
          <div class="card-item-info">
            <div class="card-item-title">Blocks</div>
            <div class="card-item-data">2132</div>
            <div class="card-item-footer">22.88</div>
          </div>
          <div class="card-body-item-bg-small"></div>
          <div class="card-body-item-bg-big"></div>
        </div>
      </template>
    </div>
    <div class="map-body">
      <WorldMap></WorldMap>
    </div>
    <div class="nft-body">
      <div class="nft-body-header">Trending NFT’s</div>
      <div class="nft-body-card">
        <template v-for="index in 4">
          <div class="nft-card">
            <img
              class="nft-card-cover"
              src="https://ts1.cn.mm.bing.net/th/id/R-C.c504f926a149bad6fcc39bc7e372c1cb?rik=y7XwtY%2bjNhSymw&riu=http%3a%2f%2f5b0988e595225.cdn.sohucs.com%2fimages%2f20190916%2fa3f5d42c09dd48f38e54dd33d22e4b8e.gif&ehk=QiEQyZV4iTSdupzA9e0D%2bQtuU9DhjQ32LZuOhRDpLAE%3d&risl=&pid=ImgRaw&r=0"
            />
            <div class="nft-card-title">Beautiful Flower</div>
            <div class="nft-card-footer">
              <div class="nft-card-footer-item">
                <div class="nft-card-footer-item-property">floor</div>
                <div class="nft-card-footer-item-value">3.3ICP</div>
              </div>
              <div class="nft-card-footer-item">
                <div class="nft-card-footer-item-property">floor</div>
                <div class="nft-card-footer-item-value">3.3ICP</div>
              </div>
              <div class="nft-card-footer-item">
                <div class="nft-card-footer-item-property">floor</div>
                <div class="nft-card-footer-item-value">3.3ICP</div>
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>
    <div class="data-body">
      <div class="node-list">
        <div class="node-list-header">
          <span class="node-list-header-span">Node list</span>
          <div class="node-list-header-button">
            <span class="node-list-header-button-span">View More</span>
            <div class="node-list-header-button-tips">
              You can view more node models and choose the model you like to plot on the node.
            </div>
            <svg
              class="node-list-header-button-tips-icon"
              width="9"
              height="12"
              viewBox="0 0 9 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M9 6L-4.89399e-07 11.1962L-3.51373e-08 0.803847L9 6Z" fill="#D1D1D1" />
            </svg>
          </div>
        </div>
        <div class="node-list-subtitle">
          <div class="node-list-subtitle-icon">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M7 1.31226C3.86394 1.31226 1.3125 3.8637 1.3125 6.99976C1.3125 10.1358 3.86394 12.6873 7 12.6873C10.1361 12.6873 12.6875 10.1358 12.6875 6.99976C12.6875 3.8637 10.1361 1.31226 7 1.31226ZM9.95996 5.09362L6.28496 9.46862C6.24465 9.51664 6.19449 9.55543 6.13787 9.58237C6.08126 9.6093 6.01952 9.62376 5.95684 9.62475H5.94945C5.88813 9.62473 5.8275 9.61182 5.77149 9.58685C5.71548 9.56189 5.66534 9.52543 5.62434 9.47983L4.04934 7.72983C4.00934 7.68741 3.97822 7.63742 3.95782 7.58279C3.93742 7.52817 3.92814 7.47002 3.93053 7.41176C3.93292 7.35351 3.94693 7.29631 3.97174 7.24355C3.99655 7.19078 4.03166 7.14351 4.075 7.1045C4.11835 7.0655 4.16905 7.03555 4.22413 7.01642C4.27921 6.99729 4.33756 6.98937 4.39574 6.99311C4.45393 6.99685 4.51078 7.01219 4.56296 7.03822C4.61514 7.06425 4.66158 7.10044 4.69957 7.14468L5.93797 8.52061L9.29004 4.53089C9.36523 4.44396 9.47161 4.39011 9.58618 4.38098C9.70076 4.37185 9.81432 4.40817 9.90233 4.4821C9.99034 4.55602 10.0457 4.66162 10.0565 4.77605C10.0673 4.89048 10.0326 5.00456 9.95996 5.09362V5.09362Z"
                fill="#01B574"
              />
            </svg>
          </div>
          <span class="node-list-subtitle-span">Last updated node</span>
        </div>
        <div class="node-list-table">
          <div class="node-list-theader">
            <div class="node-list-theader-item">Node ID</div>
            <div class="node-list-theader-item">Threshold value</div>
            <div class="node-list-theader-item">Model tag</div>
          </div>
          <div class="node-list-body">
            <template v-for="item in 14">
              <div class="node-list-main">
                <div class="node-list-main-item">5614c96583...d9c9919547</div>
                <div class="node-list-main-item">3’503’924’809 E</div>
                <div class="node-list-main-item">LOAR/CHECKPOINT/WILDCARDS...</div>
              </div>
            </template>
          </div>
        </div>
      </div>
      <div class="transactions">
        <div class="transactions-header">
          <span class="transactions-header-span">Transactions</span>
        </div>

        <div class="transactions-table">
          <div class="transactions-theader">
            <div class="transactions-theader-item">From</div>
            <div class="transactions-theader-item">To</div>
            <!-- <div class="transactions-theader-item">Type</div> -->
            <div class="transactions-theader-item">Amount</div>
          </div>
          <div class="transactions-body">
            <template v-for="item in 14">
              <div class="transactions-main">
                <div class="transactions-main-item">5614c...d9c99</div>
                <div class="transactions-main-item">5614c...d9c99</div>
                <!-- <div class="transactions-main-item">Wrap</div> -->
                <div class="transactions-main-item">0.9999</div>
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>
    <div class="models-body">
      <div class="models-body-header">
        <span class="models-body-header-span">Featured Models</span>
        <div class="models-body-header-explore">
          <span class="models-body-header-explore-span">Explore</span>
          <div class="models-body-header-explore-icon">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.5 10H2.5" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              <path
                d="M12.5 5L17.5 10L12.5 15"
                stroke="white"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>
      <div class="models-body-card">
        <template v-for="item in 4">
          <ModelsItem />
        </template>
      </div>
    </div>
    <!-- <ScreenMask>
      <div class="screen-mask-bgcolor"></div>
    </ScreenMask> -->
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from 'vue';
import WorldMap from '@/components/world-map/index.vue';
import ModelsItem from '@/components/models-item.vue';
import ScreenMask from '@/components/screen-mask.vue';

onMounted(() => {});

onUnmounted(() => {});
</script>

<style scoped>
.page {
  position: relative;
  z-index: 10;
}

.screen-mask-bgcolor {
  position: absolute;
  width: 210px;
  height: 210px;
  left: calc(50% - 210px / 2);
  top: 300px;
  background: linear-gradient(
    130.04deg,
    rgba(253, 153, 42, 0.66) 13.45%,
    rgba(125, 81, 220, 0.66) 60.04%,
    rgba(37, 237, 255, 0.66) 88.4%
  );
  filter: blur(50px);
}
.card-body {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 80px;
  padding: 116px 16px 0;
}

.card-body-item {
  position: relative;
  width: 304px;
  height: 164px;
  padding: 24px;
  border-radius: 10px;
  border: 1px solid #676767;
  background: linear-gradient(180deg, #292929 0%, #121212 64.06%, #000 100%);
  overflow: hidden;
}

.card-body-item-bg-small {
  position: absolute;
  right: -39px;
  bottom: -45px;
  width: 114px;
  height: 114px;
  border-radius: 50%;
  background: linear-gradient(185deg, rgba(253, 116, 155, 0.2) 0%, rgba(40, 26, 200, 0.2) 100%);
  opacity: 0.2;
  z-index: 2;
}
.card-body-item-bg-big {
  position: absolute;
  right: -48px;
  bottom: -44px;
  width: 176px;
  height: 176px;
  border-radius: 50%;
  background: linear-gradient(185deg, rgba(253, 116, 155, 0.2) 0%, rgba(40, 26, 200, 0.2) 100%);
  opacity: 0.2;
  z-index: 1;
}
.card-item-title {
  margin-bottom: 24px;
  font-size: 16px;
  font-weight: 300;
  line-height: 16px;
  background: linear-gradient(to bottom, rgba(252, 88, 179, 1), rgba(254, 174, 104, 1));
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
}
.card-item-data {
  margin-bottom: 32px;
  color: #fff;
  font-size: 28px;
  font-weight: 500;
  line-height: 28px;
}
.card-item-footer {
  color: #f2d6ff;
  font-size: 14px;
  font-weight: 300;
  line-height: 14px;
}

.map-body {
  padding: 0 16px 62px;
}
.nft-body {
  padding: 0 16px;
  margin-bottom: 64px;
}
.nft-body-header {
  margin-bottom: 48px;
  color: #fff;
  font-size: 24px;
  font-weight: 600;
  line-height: 24px;
}
.nft-body-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.nft-card {
  width: 300px;
  height: 400px;
  padding: 10px 10px 20px;
  border-radius: 15px;
  background-color: #201e43;
}

.nft-card-cover {
  width: 100%;
  margin-bottom: 30px;
  border-radius: 15px;
  object-fit: cover;
  aspect-ratio: 10 / 9.14;
}
.nft-card-title {
  padding: 0 10px;
  margin-bottom: 24px;
  color: #ecebf6;
  font-size: 18px;
  font-weight: 500;
  line-height: 18px;
}
.nft-card-footer {
  padding: 0 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.nft-card-footer-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.nft-card-footer-item-property {
  margin-bottom: 14px;
  color: #999;
  font-size: 12px;
  font-weight: 400;
  line-height: 12px;
}
.nft-card-footer-item-value {
  color: #f5f5f5;
  font-size: 14px;
  font-weight: 400;
  line-height: 14px;
}

.data-body {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  margin-bottom: 68px;
}
.node-list-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
}
.node-list-header-button {
  position: relative;
  height: 30px;
  padding: 0px 16px;
  border-radius: 4px;
  background: linear-gradient(90deg, #3e30ec 0%, #c01fc3 100%);
}

.node-list-header-button:hover {
  background: #131128;
  cursor: pointer;
}
.node-list-header-button-tips,
.node-list-header-button-tips-icon {
  display: block;
}
.node-list-header-button-span {
  color: #fff;
  font-size: 14px;
  font-weight: 400;
  line-height: 30px;
}
.node-list-header-button-tips {
  display: none;
  position: absolute;
  top: -8px;
  right: 120px;
  width: 232px;
  height: 50px;
  padding: 0 10px;
  border-radius: 2px;
  background: #d1d1d1;
  color: #333;
  font-size: 12px;
  font-weight: 400;
  line-height: 16px;
}

.node-list-header-button-tips-icon {
  display: none;
  position: absolute;
  top: 10px;
  right: 111px;
}

.node-list {
  width: 886px;
  height: 455px;
  padding: 24px 20px 0;
  border-radius: 15px;
  background: linear-gradient(169deg, #201e43 0%, rgba(32, 30, 67, 0.6) 100%);
  backdrop-filter: blur(60px);
  box-sizing: border-box;
}

.node-list-header-span {
  color: #fff;
  font-size: 18px;
  font-weight: 400;
  line-height: 18px;
}

.node-list-subtitle {
  display: flex;
  align-items: center;
  margin-bottom: 4px;
}

.node-list-subtitle-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 14px;
  height: 14px;
  margin-right: 4px;
}
.node-list-subtitle-span {
  color: #a0aec0;
  font-size: 14px;
  font-weight: 400;
  line-height: 14px;
}

.node-list-theader {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 0;
}

.node-list-theader-item {
  width: 100%;
  color: #a0aec0;
  font-size: 12px;
  font-weight: 400;
  line-height: 12px;
}
.node-list-body {
  overflow-y: auto;
  height: 336px;
}

.node-list-body::-webkit-scrollbar {
  display: none;
}
.node-list-main {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 56px;
  border-top: 1px solid #56577a;
}
.node-list-main-item {
  width: 100%;
  line-height: 56px;
  color: #fff;
  font-size: 16px;
  font-weight: 400;
  line-height: 16px;
}

.transactions {
  width: 455px;
  height: 455px;
  padding: 24px 20px 0;
  border-radius: 15px;
  background: linear-gradient(175deg, #201e43 0%, rgba(32, 30, 67, 0.6) 100%);
  backdrop-filter: blur(60px);
  overflow-y: auto;
  box-sizing: border-box;
}
.transactions::-webkit-scrollbar {
  display: none;
}
.transactions-header {
  margin-bottom: 38px;
}
.transactions-header-span {
  color: #fff;
  font-size: 18px;
  font-weight: 400;
  line-height: 18px;
}

.transactions-theader {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 0;
}

.transactions-theader-item {
  width: 100%;
  color: #a0aec0;
  font-size: 12px;
  font-weight: 400;
  line-height: 12px;
}
.transactions-body {
  overflow-y: auto;
  height: 336px;
}

.transactions-body::-webkit-scrollbar {
  display: none;
}
.transactions-main {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 56px;
  border-top: 1px solid #56577a;
}
.transactions-main-item {
  width: 100%;
  line-height: 56px;
  color: #fff;
  font-size: 16px;
  font-weight: 400;
  line-height: 16px;
}

.models-body {
  padding: 0 16px;
}
.models-body-header {
  margin-bottom: 48px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.models-body-header-span {
  color: #fff;
  font-size: 24px;
  font-weight: 600;
  line-height: 24px;
}
.models-body-header-explore {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px 8px;
  border-radius: 4px;
  background: linear-gradient(270deg, #c020c4 0%, #3e30ec 100%);
}
.models-body-header-explore-span {
  margin-right: 4px;
  color: #fff;
  font-size: 14px;
  font-weight: 400;
  line-height: 14px;
}
.models-body-header-explore-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
}

.models-body-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
