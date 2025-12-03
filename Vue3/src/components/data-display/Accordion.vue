<script setup>
import { ref } from 'vue'

defineProps({
  items: Array
})

const activeIndex = ref(null)
const contentRefs = ref([])

const toggle = (index) => {
  if (activeIndex.value === index) {
    activeIndex.value = null
  } else {
    activeIndex.value = index
  }
}
</script>

<template>
  <div class="accordion">
    <div v-for="(item, index) in items" :key="index" class="accordion-item" :class="{ active: activeIndex === index }">
      <button class="accordion-header" @click="toggle(index)">
        <span>{{ item.title }}</span>
        <i class="fas fa-chevron-down"></i>
      </button>
      <div 
        class="accordion-content" 
        :ref="el => contentRefs[index] = el"
        :style="{ maxHeight: activeIndex === index ? (contentRefs[index]?.scrollHeight + 'px') : '0' }"
      >
        <p>{{ item.content }}</p>
      </div>
    </div>
  </div>
</template>
