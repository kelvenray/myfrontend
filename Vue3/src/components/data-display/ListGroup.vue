<script setup>
</script>

<template>
  <ul class="list-group">
    <li class="list-group-item active">
      <i class="fas fa-star"></i> 活跃项
    </li>
    <li class="list-group-item">
      <i class="fas fa-envelope"></i> 收件箱 
      <span class="badge rounded primary" style="font-size:.7em;padding:.2em .5em;margin-left:auto;">14</span>
    </li>
    <li class="list-group-item">
      <i class="fas fa-cog"></i> 设置
    </li>
    <li class="list-group-item disabled">
      <i class="fas fa-ban"></i> 禁用项
    </li>
  </ul>
</template>

<style scoped>
.list-group{ list-style:none; padding:0; margin:0; display:flex; flex-direction:column; gap:.5rem; }
.list-group-item{ display:flex; align-items:center; gap:.6rem; background:var(--card); padding:.75rem 1rem; border-radius:12px; }
.list-group-item.active{ border-left:4px solid var(--accent); }
.list-group-item.disabled{ opacity:.6; }
</style>