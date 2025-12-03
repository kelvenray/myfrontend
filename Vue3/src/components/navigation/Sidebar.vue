<script setup>
import { defineEmits } from 'vue'

const emit = defineEmits(['close'])
</script>

<template>
  <aside id="sidebar">
    <h2 class="logo">TECHMAN</h2>
    <nav>
      <router-link to="/dashboard" class="nav-item" @click="$emit('close')">Dashboard</router-link>
      <router-link to="/charts" class="nav-item" @click="$emit('close')">图表页</router-link>
      <router-link to="/form" class="nav-item" @click="$emit('close')">表单页</router-link>
      <router-link to="/login" class="nav-item" @click="$emit('close')">登录页</router-link>
    </nav>
  </aside>
</template>
