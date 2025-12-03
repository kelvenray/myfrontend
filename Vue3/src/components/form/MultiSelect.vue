<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  options: { type: Array, required: true },
  modelValue: { type: Array, default: () => [] }
})

const emit = defineEmits(['update:modelValue'])

const isOpen = ref(false)
const containerRef = ref(null)

const toggle = () => isOpen.value = !isOpen.value

const handleClickOutside = (e) => {
  if (containerRef.value && !containerRef.value.contains(e.target)) {
    isOpen.value = false
  }
}

onMounted(() => document.addEventListener('click', handleClickOutside))
onUnmounted(() => document.removeEventListener('click', handleClickOutside))

const triggerText = computed(() => {
  if (props.modelValue.length === 0) return '请选择选项...'
  if (props.modelValue.length <= 2) return props.modelValue.join(', ')
  return `${props.modelValue.length} 个已选择`
})

const handleChange = (e) => {
  const value = e.target.value
  const checked = e.target.checked
  const newValue = [...props.modelValue]
  
  if (checked) {
    newValue.push(value)
  } else {
    const index = newValue.indexOf(value)
    if (index > -1) newValue.splice(index, 1)
  }
  
  emit('update:modelValue', newValue)
}
</script>

<template>
  <div class="multi-select-container" :class="{ open: isOpen }" ref="containerRef">
    <div class="multi-select-trigger" @click="toggle">{{ triggerText }}</div>
    <div class="multi-select-dropdown" @click.stop>
      <label v-for="opt in options" :key="opt" class="multi-select-option">
        <input 
          type="checkbox" 
          :value="opt" 
          :checked="modelValue.includes(opt)"
          @change="handleChange"
        > 
        {{ opt }}
      </label>
    </div>
  </div>
</template>
