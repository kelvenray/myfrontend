<script setup>
import { ref } from 'vue'
import Chart from '@/components/data-display/Chart.vue'

const chart1Options = ref({
    backgroundColor: 'transparent',
    legend: { top: 10, data: ['销售', '订单'], textStyle: { color: '#94a3b8' } },
    grid: { top: 50, right: 20, bottom: 40, left: 40, containLabel: true },
    tooltip: { trigger: 'axis' },
    xAxis: { type: 'category', data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], axisLabel: { color: '#94a3b8' } },
    yAxis: { type: 'value', axisLabel: { color: '#94a3b8' } },
    series: [
        { name: '销售', data: [120, 200, 150, 280, 330, 270, 400], type: 'line', smooth: true, itemStyle: { color: '#8b5cf6' } },
        { name: '订单', data: [80, 150, 120, 220, 280, 230, 350], type: 'line', smooth: true, itemStyle: { color: '#10b981' } }
    ]
})

const chart2Options = ref({
    backgroundColor: 'transparent',
    legend: { top: 10, data: ['直接访问', '邮件营销'], textStyle: { color: '#94a3b8' } },
    tooltip: { trigger: 'axis' },
    xAxis: { type: 'category', data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'], axisLabel: { color: '#94a3b8' } },
    yAxis: { type: 'value', axisLabel: { color: '#94a3b8' } },
    series: [
        { name: '直接访问', type: 'bar', data: [120, 200, 150, 80, 70, 110, 130], itemStyle: { color: '#ec4899' } },
        { name: '邮件营销', type: 'bar', data: [220, 182, 191, 234, 290, 330, 310], itemStyle: { color: '#8b5cf6' } }
    ]
})

const chart3Options = ref({
    backgroundColor: 'transparent',
    legend: { orient: 'vertical', right: 10, top: 20, bottom: 20, data: ['直接访问', '联盟广告', '视频广告', '搜索引擎'] },
    tooltip: { trigger: 'item' },
    series: [
        {
            name: '访问来源',
            type: 'pie',
            radius: '50%',
            data: [
                { value: 1048, name: '直接访问' },
                { value: 735, name: '联盟广告' },
                { value: 580, name: '视频广告' },
                { value: 484, name: '搜索引擎' }
            ],
            emphasis: { itemStyle: { shadowBlur: 10, shadowOffsetX: 0, shadowColor: 'rgba(0, 0, 0, 0.5)' } }
        }
    ]
})
</script>

<template>
  <section id="charts" class="page active">
    <h1 class="title">数据可视化</h1>
    <div class="grid">
      <div class="card">
        <h4 class="chart-title">折线图 (多系列)</h4>
        <Chart :options="chart1Options" />
      </div>
      <div class="card">
        <h4 class="chart-title">柱状图</h4>
        <Chart :options="chart2Options" />
      </div>
      <div class="card">
        <h4 class="chart-title">饼图</h4>
        <Chart :options="chart3Options" />
      </div>
    </div>
  </section>
</template>
