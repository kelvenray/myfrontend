<script setup>
</script>

<template>
  <div class="pagination-wrapper">
    <ul class="pagination">
      <li class="page-item disabled"><a href="#" class="page-link"><i class="fas fa-chevron-left"></i></a></li>
      <li class="page-item active"><a href="#" class="page-link">1</a></li>
      <li class="page-item"><a href="#" class="page-link">2</a></li>
      <li class="page-item"><a href="#" class="page-link">3</a></li>
      <li class="page-item"><a href="#" class="page-link"><i class="fas fa-chevron-right"></i></a></li>
    </ul>
    <div class="page-jump">
      <span>跳转至</span>
      <input type="number" class="page-jump-input" placeholder="#" min="1">
      <span>页</span>
    </div>
  </div>
</template>