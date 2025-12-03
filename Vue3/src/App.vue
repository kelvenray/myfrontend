<script setup>
import { ref, onMounted } from 'vue'
import { RouterView } from 'vue-router'
import Sidebar from '@/components/navigation/Sidebar.vue'
import { useToast } from '@/composables/useToast'

// Toast Logic
const { toasts } = useToast()

// Theme & Color Scheme Logic
const theme = ref('dark')
const schemes = [
  { id: 'purple', title: 'Purple', color: '#8b5cf6' },
  { id: 'techman', title: 'TechMan', color: '#f97316' },
  { id: 'ocean', title: 'Ocean Blue', color: '#3b82f6' },
  { id: 'forest', title: 'Forest Green', color: '#10b981' },
  { id: 'sunset', title: 'Sunset Red', color: '#ef4444' }
]
const selectedScheme = ref(localStorage.getItem('nexus_scheme') || 'purple')
const isSchemePanelOpen = ref(false)

const toggleTheme = () => {
  theme.value = theme.value === 'dark' ? 'light' : 'dark'
  document.documentElement.dataset.theme = theme.value
  // notify charts to update colors
  window.dispatchEvent(new CustomEvent('schemechange'))
}
const toggleSchemePanel = () => {
  isSchemePanelOpen.value = !isSchemePanelOpen.value
}
const applyScheme = (id) => {
  selectedScheme.value = id
  localStorage.setItem('nexus_scheme', id)
  document.documentElement.dataset.scheme = id
  // notify charts to update colors
  window.dispatchEvent(new CustomEvent('schemechange'))
}

onMounted(() => {
  document.documentElement.dataset.theme = theme.value
  document.documentElement.dataset.scheme = selectedScheme.value
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
  <button id="colorSchemeBtn" class="fab" aria-label="Change Color Scheme" @click="toggleSchemePanel">
    <i class="fas fa-palette"></i>
  </button>
  <div id="colorSchemePanel" :class="{ open: isSchemePanelOpen }">
    <div
      v-for="s in schemes"
      :key="s.id"
      class="scheme-option"
      :class="{ active: selectedScheme === s.id }"
      :title="s.title"
      :style="{ background: s.color }"
      @click="applyScheme(s.id)"
    ></div>
  </div>
  <button id="menuBtn" class="fab top-left" aria-label="Toggle Menu" @click="toggleSidebar">
    <i class="fas fa-bars"></i>
  </button>

  <div class="app">
    <Sidebar :class="{ open: isSidebarOpen }" @close="isSidebarOpen = false" />

    <main id="content">
      <router-view v-slot="{ Component, route }">
        <transition name="fade" mode="out-in">
          <component :is="Component" :key="route.path" />
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
