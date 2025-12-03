<script setup>
import { ref } from 'vue'

const isOpen = ref(false)
const contentRef = ref(null)

const toggle = () => {
  isOpen.value = !isOpen.value
}
</script>

<template>
  <div class="collapse-wrapper">
    <button class="btn primary small" @click="toggle" style="margin-bottom: 1rem;">
      切换显示状态
    </button>
    <div 
      class="collapse-content" 
      :class="{ show: isOpen }"
      ref="contentRef"
      :style="{ maxHeight: isOpen ? (contentRef?.scrollHeight + 'px') : '0' }"
    >
      <div class="collapse-card-body">
        <slot></slot>
      </div>
    </div>
  </div>
</template>
