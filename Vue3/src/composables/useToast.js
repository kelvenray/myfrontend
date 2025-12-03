import { ref } from 'vue'

const toasts = ref([])

export function useToast() {
  const showToast = (msg, type = 'info') => {
    const id = Date.now() + Math.random()
    toasts.value.push({ id, msg, type })
    
    // Auto remove
    setTimeout(() => {
      const index = toasts.value.findIndex(t => t.id === id)
      if (index !== -1) {
        toasts.value.splice(index, 1)
      }
    }, 3000)
  }
  
  return { toasts, showToast }
}
