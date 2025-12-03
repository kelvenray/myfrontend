<script setup>
import { ref } from 'vue'
const showPopover = ref(false)
const togglePopover = () => { showPopover.value = !showPopover.value }
</script>

<template>
  <div>
    <button class="btn secondary small" @click="togglePopover">点击显示 Popover</button>
    <div v-if="showPopover" class="popover">这是一段弹出框的内容！</div>
    <br><br>
    <button class="btn secondary small" title="这是一个工具提示">悬停显示 Tooltip</button>
  </div>
</template>

<style scoped>
.popover{ margin-top:.5rem; background:var(--card); padding:.75rem 1rem; border-radius:12px; box-shadow:var(--shadow); }
</style>