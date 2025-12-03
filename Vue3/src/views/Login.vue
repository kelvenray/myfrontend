<script setup>
import { useRouter } from 'vue-router'
import { useToast } from '@/composables/useToast'
import { ref } from 'vue'

const router = useRouter()
const { showToast } = useToast()

const isLoading = ref(false)

const handleLogin = () => {
  isLoading.value = true
  setTimeout(() => {
    router.push('/dashboard')
    showToast('登录成功！欢迎回来。', 'success')
    isLoading.value = false
  }, 800)
}
</script>

<template>
  <section id="login" class="page center-mode active">
    <div class="card login-card">
      <h2>TECHMAN</h2>
      <form @submit.prevent="handleLogin">
        <input type="text" placeholder="用户名" class="input" required aria-label="Username" autocomplete="username">
        <input type="password" placeholder="密码" class="input" required aria-label="Password" autocomplete="current-password">
        <button type="submit" class="btn glow" :disabled="isLoading">
            {{ isLoading ? '登录中...' : '立即登录' }}
        </button>
      </form>
    </div>
  </section>
</template>
