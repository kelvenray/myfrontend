<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import * as echarts from 'echarts'

const props = defineProps({
  options: {
    type: Object,
    required: true
  }
})

const chartRef = ref(null)
let chartInstance = null

const initChart = () => {
  if (chartRef.value) {
    chartInstance = echarts.init(chartRef.value)
    chartInstance.setOption(props.options)
  }
}

const resizeHandler = () => {
  chartInstance && chartInstance.resize()
}

const updateColors = () => {
  const style = getComputedStyle(document.documentElement)
  const accent = style.getPropertyValue('--accent').trim()
  const secondary = style.getPropertyValue('--secondary').trim()
  const success = style.getPropertyValue('--success').trim()
  const warning = style.getPropertyValue('--warning').trim()
  const danger = style.getPropertyValue('--danger').trim()
  if (!chartInstance) return
  chartInstance.setOption({
    color: [accent, secondary, success, warning, danger]
  })
}

onMounted(() => {
  initChart()
  // react to color scheme changes by reading CSS variables
  window.addEventListener('schemechange', updateColors)
  window.addEventListener('resize', resizeHandler)
})

onUnmounted(() => {
  window.removeEventListener('schemechange', updateColors)
  window.removeEventListener('resize', resizeHandler)
  if (chartInstance) {
    chartInstance.dispose()
    chartInstance = null
  }
})

watch(() => props.options, (newVal) => {
  chartInstance?.setOption(newVal)
}, { deep: true })
</script>

<template>
  <div ref="chartRef" class="chart"></div>
</template>
