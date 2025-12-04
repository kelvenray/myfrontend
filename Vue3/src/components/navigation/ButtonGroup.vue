<script setup>
import { ref } from 'vue'

const activeHorizontal = ref(null)
const activeVertical = ref(null)
</script>

<template>
  <div>
    <div class="btn-group">
      <button 
        class="btn small" 
        :class="{ active: activeHorizontal === 'left' }"
        @click="activeHorizontal = 'left'"
      >左</button>
      <button 
        class="btn small" 
        :class="{ active: activeHorizontal === 'center' }"
        @click="activeHorizontal = 'center'"
      >中</button>
      <button 
        class="btn small" 
        :class="{ active: activeHorizontal === 'right' }"
        @click="activeHorizontal = 'right'"
      >右</button>
    </div>
    <br><br>
    <div class="btn-group vertical">
      <button 
        class="btn small" 
        :class="{ active: activeVertical === 'top' }"
        @click="activeVertical = 'top'"
      >顶部</button>
      <button 
        class="btn small" 
        :class="{ active: activeVertical === 'middle' }"
        @click="activeVertical = 'middle'"
      >中间</button>
      <button 
        class="btn small" 
        :class="{ active: activeVertical === 'bottom' }"
        @click="activeVertical = 'bottom'"
      >底部</button>
    </div>
  </div>
</template>

<style scoped>
.btn-group { display:inline-flex; gap:.5rem; }
.btn-group.vertical{ display:flex; flex-direction:column; }
</style>