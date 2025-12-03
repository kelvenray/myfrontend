<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  modelValue: String
})
const emit = defineEmits(['update:modelValue'])

const isOpen = ref(false)
const containerRef = ref(null)

const displayDate = ref(new Date())
const selectedDate = computed(() => props.modelValue ? new Date(props.modelValue) : new Date())

const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
]

const currentMonthLabel = computed(() => {
    return `${months[displayDate.value.getMonth()]} ${displayDate.value.getFullYear()}`
})

const calendarDays = computed(() => {
    const year = displayDate.value.getFullYear()
    const month = displayDate.value.getMonth()
    const firstDayIndex = new Date(year, month, 1).getDay()
    const lastDay = new Date(year, month + 1, 0).getDate()
    
    const days = []
    
    // Empty days
    for (let i = 0; i < firstDayIndex; i++) {
        days.push({ day: '', empty: true })
    }
    
    // Actual days
    const today = new Date()
    for (let i = 1; i <= lastDay; i++) {
        const d = new Date(year, month, i)
        const isToday = i === today.getDate() && month === today.getMonth() && year === today.getFullYear()
        const isSelected = props.modelValue && i === selectedDate.value.getDate() && month === selectedDate.value.getMonth() && year === selectedDate.value.getFullYear()
        days.push({ day: i, empty: false, today: isToday, selected: isSelected })
    }
    
    return days
})

const prevMonth = () => {
    displayDate.value = new Date(displayDate.value.getFullYear(), displayDate.value.getMonth() - 1, 1)
}

const nextMonth = () => {
    displayDate.value = new Date(displayDate.value.getFullYear(), displayDate.value.getMonth() + 1, 1)
}

const selectDate = (day) => {
    if (day.empty) return
    const year = displayDate.value.getFullYear()
    const month = displayDate.value.getMonth()
    const date = new Date(year, month, day.day)
    
    // Format YYYY-MM-DD
    const y = date.getFullYear()
    const m = String(date.getMonth() + 1).padStart(2, '0')
    const d = String(date.getDate()).padStart(2, '0')
    const dateStr = `${y}-${m}-${d}`
    
    emit('update:modelValue', dateStr)
    isOpen.value = false
}

const toggle = () => isOpen.value = !isOpen.value

const handleClickOutside = (e) => {
    if (containerRef.value && !containerRef.value.contains(e.target)) {
        isOpen.value = false
    }
}

onMounted(() => document.addEventListener('click', handleClickOutside))
onUnmounted(() => document.removeEventListener('click', handleClickOutside))
</script>

<template>
  <div class="custom-date-container" :class="{ open: isOpen }" ref="containerRef">
    <div class="custom-date-trigger" @click="toggle" tabindex="0">{{ modelValue || 'Select Date' }}</div>
    <div class="custom-calendar">
        <div class="calendar-header">
            <button class="calendar-nav prev" @click.stop="prevMonth"><i class="fas fa-chevron-left"></i></button>
            <span class="current-month">{{ currentMonthLabel }}</span>
            <button class="calendar-nav next" @click.stop="nextMonth"><i class="fas fa-chevron-right"></i></button>
        </div>
        <div class="calendar-weekdays">
            <div>Sun</div><div>Mon</div><div>Tue</div><div>Wed</div><div>Thu</div><div>Fri</div><div>Sat</div>
        </div>
        <div class="calendar-days">
            <div 
                v-for="(day, index) in calendarDays" 
                :key="index"
                class="calendar-day"
                :class="{ empty: day.empty, today: day.today, selected: day.selected }"
                @click.stop="selectDate(day)"
            >
                {{ day.day }}
            </div>
        </div>
    </div>
  </div>
</template>
