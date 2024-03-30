<template>
  <div class="section-header">
    <span class="section-header-title"><slot></slot></span>
  </div>
</template>
<script setup lang="ts"></script>
<style scoped>
.section-header {
}

.section-header-title {
  font-family: Oxanium;
  font-size: 18px;
  font-weight: 500;
}

@media (min-width: 640px) {
  .section-header-title {
    font-size: 24px;
  }
}
</style>
