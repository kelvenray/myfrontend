<script setup>
import { ref, onMounted } from 'vue'
import { RouterView } from 'vue-router'
import Sidebar from '@/components/navigation/Sidebar.vue'
import { useToast } from '@/composables/useToast'

// Toast Logic
const { toasts } = useToast()

// Theme Logic
const theme = ref('dark')
const toggleTheme = () => {
  theme.value = theme.value === 'dark' ? 'light' : 'dark'
  document.documentElement.dataset.theme = theme.value
}

onMounted(() => {
  document.documentElement.dataset.theme = theme.value
})

// Mobile Menu Logic
const isSidebarOpen = ref(false)
const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value
}
</script>

<template>
  <button id="themeBtn" class="fab" aria-label="Toggle Theme" @click="toggleTheme">
    {{ theme === 'dark' ? 'MOON' : 'SUN' }}
  </button>
  <button id="menuBtn" class="fab top-left" aria-label="Toggle Menu" @click="toggleSidebar">
    <i class="fas fa-bars"></i>
  </button>

  <div class="app">
    <Sidebar :class="{ open: isSidebarOpen }" @close="isSidebarOpen = false" />

    <main id="content">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
  </div>

  <div id="toast">
    <transition-group name="toast-slide">
      <div v-for="toast in toasts" :key="toast.id" :class="['toast', toast.type]">
        {{ toast.msg }}
      </div>
    </transition-group>
  </div>
</template>

<style scoped>
.toast-slide-enter-active,
.toast-slide-leave-active {
  transition: all 0.3s ease;
}
.toast-slide-enter-from,
.toast-slide-leave-to {
  transform: translateX(100%);
  opacity: 0;
}
/* Ensure toast items have pointer-events auto to allow clicks or whatever if needed, though global CSS handles it */
.toast {
  pointer-events: auto;
  margin-bottom: 1rem;
}
</style>
