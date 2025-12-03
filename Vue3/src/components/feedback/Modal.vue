<script setup>
defineProps({
  isOpen: Boolean,
  title: String
})

const emit = defineEmits(['close', 'save'])
</script>

<template>
  <div class="modal" :class="{ open: isOpen }" @click.self="$emit('close')">
    <div class="modal-content">
        <span class="close-modal" @click="$emit('close')">&times;</span>
        <h2>{{ title }}</h2>
        <slot></slot>
        <div class="modal-footer">
            <button class="btn secondary small" @click="$emit('close')">关闭</button>
            <button class="btn primary small" @click="$emit('save')">保存更改</button>
        </div>
    </div>
  </div>
</template>
