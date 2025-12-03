<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  options: { type: Array, required: true },
  modelValue: [String, Number],
  placeholder: { type: String, default: 'Select option' }
})

const emit = defineEmits(['update:modelValue'])

const isOpen = ref(false)
const containerRef = ref(null)

const toggle = () => isOpen.value = !isOpen.value

const select = (option) => {
  if (option.disabled) return
  emit('update:modelValue', option.value)
  isOpen.value = false
}

const handleClickOutside = (e) => {
  if (containerRef.value && !containerRef.value.contains(e.target)) {
    isOpen.value = false
  }
}

onMounted(() => document.addEventListener('click', handleClickOutside))
onUnmounted(() => document.removeEventListener('click', handleClickOutside))

const selectedLabel = () => {
  const opt = props.options.find(o => o.value === props.modelValue)
  return opt ? opt.label : props.placeholder
}
</script>

<template>
  <div class="custom-select-container" :class="{ open: isOpen }" ref="containerRef">
    <div class="custom-select-trigger" @click="toggle" tabindex="0">{{ selectedLabel() }}</div>
    <div class="custom-options">
      <div 
        v-for="opt in options" 
        :key="opt.value" 
        class="custom-option" 
        :class="{ selected: modelValue === opt.value, disabled: opt.disabled }"
        @click="select(opt)"
        :data-value="opt.value"
      >
        {{ opt.label }}
      </div>
    </div>
  </div>
</template>
