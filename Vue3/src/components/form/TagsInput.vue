<script setup>
import { ref } from 'vue'

const props = defineProps({
  modelValue: { type: Array, default: () => [] }
})
const emit = defineEmits(['update:modelValue'])

const inputValue = ref('')

const addTag = () => {
  const text = inputValue.value.trim()
  if (text && !props.modelValue.includes(text)) {
    emit('update:modelValue', [...props.modelValue, text])
  }
  inputValue.value = ''
}

const removeTag = (index) => {
  const newValue = [...props.modelValue]
  newValue.splice(index, 1)
  emit('update:modelValue', newValue)
}

const handleKeydown = (e) => {
  if (e.key === 'Enter') {
    e.preventDefault()
    addTag()
  }
}
</script>

<template>
  <div class="tags-input-container">
    <div class="tags-list">
      <span v-for="(tag, index) in modelValue" :key="index" class="tag-item">
        {{ tag }} <i class="fas fa-times" @click="removeTag(index)"></i>
      </span>
    </div>
    <input 
      type="text" 
      class="tags-input" 
      placeholder="输入并回车添加..." 
      v-model="inputValue"
      @keydown="handleKeydown"
    >
  </div>
</template>
