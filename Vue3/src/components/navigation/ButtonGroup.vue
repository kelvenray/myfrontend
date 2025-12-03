<script setup>
</script>

<template>
  <div>
    <div class="btn-group">
      <button class="btn small">左</button>
      <button class="btn small">中</button>
      <button class="btn small">右</button>
    </div>
    <br><br>
    <div class="btn-group vertical">
      <button class="btn small">顶部</button>
      <button class="btn small">中间</button>
      <button class="btn small">底部</button>
    </div>
  </div>
</template>

<style scoped>
.btn-group { display:inline-flex; gap:.5rem; }
.btn-group.vertical{ display:flex; flex-direction:column; }
</style>