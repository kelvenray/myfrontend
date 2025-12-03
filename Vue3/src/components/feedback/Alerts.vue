<script setup>
const props = defineProps({
  items: {
    type: Array,
    default: () => ([
      { type: 'success', icon: 'fas fa-check-circle', msg: '操作成功完成。' },
      { type: 'warning', icon: 'fas fa-exclamation-triangle', msg: '注意：请检查您的输入。' },
      { type: 'error', icon: 'fas fa-times-circle', msg: '错误：发生了一个问题。' },
      { type: 'info', icon: 'fas fa-info-circle', msg: '信息：有新的更新可用。' }
    ])
  }
})
const emit = defineEmits(['close'])
const close = (idx) => emit('close', idx)
</script>

<template>
  <div class="alerts">
    <div v-for="(a, idx) in items" :key="idx" :class="['alert', a.type]">
      <i :class="a.icon"></i>
      <span>{{ a.msg }}</span>
      <span class="close-btn" @click="close(idx)">&times;</span>
    </div>
  </div>
  </template>

<style scoped>
.alerts { display: flex; flex-direction: column; gap: .75rem; }
.alert { display:flex; align-items:center; gap:.6rem; background: var(--card); padding: .75rem 1rem; border-radius: 12px; }
.alert.success { border-left: 4px solid var(--success); }
.alert.warning { border-left: 4px solid var(--warning); }
.alert.error { border-left: 4px solid var(--danger); }
.alert.info { border-left: 4px solid var(--accent); }
.close-btn { margin-left:auto; cursor:pointer; }
</style>