<script setup>
import { ref } from 'vue'

const props = defineProps({
  tabs: { type: Array, required: true }
})

const activeTab = ref(props.tabs[0]?.id)
</script>

<template>
  <div class="tabs">
    <div class="tab-header">
      <div 
        v-for="tab in tabs" 
        :key="tab.id" 
        class="tab-item" 
        :class="{ active: activeTab === tab.id }"
        @click="activeTab = tab.id"
      >
        {{ tab.label }}
      </div>
    </div>
    <div class="tab-content">
      <div 
        v-for="tab in tabs" 
        :key="tab.id"
        :id="tab.id"
        class="tab-pane" 
        :class="{ active: activeTab === tab.id }"
      >
        <p>{{ tab.content }}</p>
      </div>
    </div>
  </div>
</template>
