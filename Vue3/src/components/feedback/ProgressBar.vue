<script setup>
const props = defineProps({
  value: { type: Number, default: 75 }
})
</script>

<template>
  <div class="progress-container">
    <div class="progress-label">{{ value }}% 完成</div>
    <div class="progress-bar-container">
      <div class="progress-bar" :style="{ width: `${value}%` }"></div>
    </div>
  </div>
</template>