<script setup>
import { ref } from 'vue'
const value = ref(3)
</script>

<template>
  <div class="rating">
    <label v-for="n in 5" :key="n" :title="`${n}星`">
      <input type="radio" name="rating" :value="n" v-model="value">
      <i class="fas fa-star"></i>
    </label>
  </div>
</template>