<script setup>
</script>

<template>
  <div class="badges">
    <span class="badge primary">Primary</span>
    <span class="badge secondary">Secondary</span>
    <span class="badge success">Success</span>
    <span class="badge danger">Danger</span>
    <span class="badge warning">Warning</span>
  </div>
  <div class="badges" style="margin-top:1rem;">
    <span class="badge rounded primary">12</span>
    <span class="badge rounded success"><i class="fas fa-check"></i></span>
    <span class="badge rounded danger">!</span>
  </div>
  <h4 style="margin: 1rem 0 .5rem; font-size: 1rem; color: var(--accent);">Breadcrumb</h4>
  <nav aria-label="breadcrumb">
    <ol class="breadcrumb">
      <li class="breadcrumb-item"><a href="#">首页</a></li>
      <li class="breadcrumb-item"><a href="#">管理</a></li>
      <li class="breadcrumb-item active" aria-current="page">数据列表</li>
    </ol>
  </nav>
</template>

<style scoped>
.badges { display:flex; gap:.5rem; align-items:center; }
.badge { background: var(--card); padding: .35rem .6rem; border-radius: 10px; box-shadow: var(--shadow); font-size: .85rem; }
.badge.primary{ background: var(--accent); color: #fff; }
.badge.secondary{ background: var(--pink); color: #fff; }
.badge.success{ background: var(--green); color: #fff; }
.badge.danger{ background: var(--red); color: #fff; }
.badge.warning{ background: var(--warning); color: #fff; }
.badge.rounded{ border-radius: 999px; }
.breadcrumb { list-style: none; display:flex; gap:.4rem; color:#94a3b8; }
.breadcrumb-item a{ color: var(--accent); text-decoration:none; }
.breadcrumb-item.active{ color:#94a3b8; }
</style>