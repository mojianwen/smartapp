<template>
  <view class="login-container">
    <view class="login-bg"></view>
    <view class="login-content">
      <view class="login-header">
        <image class="logo" src="/static/logo.png" />
        <text class="app-name">SmartApp</text>
        <text class="app-desc">智能管理系统</text>
      </view>
      
      <view class="login-form">
        <view class="form-item">
          <view class="input-wrapper">
            <uni-icons type="person" size="20" color="#999" class="input-icon"></uni-icons>
            <input 
              v-model="loginForm.username" 
              placeholder="请输入用户名"
              class="form-input"
            />
          </view>
        </view>
        
        <view class="form-item">
          <view class="input-wrapper">
            <uni-icons type="locked" size="20" color="#999" class="input-icon"></uni-icons>
            <input 
              v-model="loginForm.password" 
              type="password"
              placeholder="请输入密码"
              class="form-input"
            />
          </view>
        </view>
        
        <view class="form-actions">
          <view class="remember-me">
            <checkbox :checked="rememberMe" @change="toggleRemember" color="#4F46E5" />
            <text class="remember-text">记住密码</text>
          </view>
          <text class="forgot-password">忘记密码?</text>
        </view>
        
        <button 
          class="login-btn" 
          :class="{ 'btn-loading': loading }"
          :loading="loading"
          @click="handleLogin"
        >
          {{ loading ? '登录中...' : '登录' }}
        </button>
        
        <view class="login-tip">
          <text>默认账号：admin / admin123</text>
        </view>
      </view>
      
      <view class="other-login">
        <view class="divider">
          <view class="divider-line"></view>
          <text class="divider-text">其他登录方式</text>
          <view class="divider-line"></view>
        </view>
        
        <view class="social-login">
          <view class="social-item">
            <uni-icons type="weixin" size="24" color="#09BB07"></uni-icons>
          </view>
          <view class="social-item">
            <uni-icons type="qq" size="24" color="#12B7F5"></uni-icons>
          </view>
          <view class="social-item">
            <uni-icons type="weibo" size="24" color="#E6162D"></uni-icons>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { login } from '@/utils/api/auth'
import { loginRedirect } from '@/utils/final-solution'

const loginForm = ref({
  username: 'admin',
  password: 'admin123'
})

const loading = ref(false)
const rememberMe = ref(false)

const toggleRemember = () => {
  rememberMe.value = !rememberMe.value
}

const handleLogin = async () => {
  console.log('开始登录流程')
  if (!loginForm.value.username || !loginForm.value.password) {
    uni.showToast({
      title: '请输入用户名和密码',
      icon: 'none'
    })
    return
  }
  
  loading.value = true
  
  try {
    console.log('调用登录API:', loginForm.value)
    // 调用真实登录API
    const response = await login(loginForm.value)
    console.log('登录API响应:', response)
    
    if (response.code === 200) {
      console.log('登录成功，准备存储token')
      // 存储token
      uni.setStorageSync('token', response.data.token)
      console.log('Token已存储:', response.data.token)
      
      uni.showToast({
        title: '登录成功',
        icon: 'success'
      })
      
      // 使用最终解决方案跳转
      console.log('准备跳转到首页（最终方案）')
      loginRedirect()
    } else {
      console.log('登录失败:', response.message)
      uni.showToast({
        title: response.message || '登录失败',
        icon: 'none'
      })
    }
  } catch (error) {
    console.error('登录错误:', error)
    uni.showToast({
      title: '网络错误或服务器异常',
      icon: 'none'
    })
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.login-container {
  position: relative;
  height: 100vh;
  overflow: hidden;
}

.login-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  z-index: 1;
}

.login-content {
  position: relative;
  z-index: 2;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 60rpx;
}

.login-header {
  text-align: center;
  margin-bottom: 80rpx;
}

.logo {
  width: 120rpx;
  height: 120rpx;
  margin-bottom: 30rpx;
}

.app-name {
  display: block;
  font-size: 48rpx;
  font-weight: bold;
  color: #fff;
  margin-bottom: 10rpx;
}

.app-desc {
  display: block;
  font-size: 28rpx;
  color: rgba(255, 255, 255, 0.8);
}

.login-form {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 24rpx;
  padding: 50rpx 40rpx;
  box-shadow: 0 20rpx 40rpx rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
}

.form-item {
  margin-bottom: 30rpx;
}

.input-wrapper {
  display: flex;
  align-items: center;
  background: #f8f9fa;
  border-radius: 16rpx;
  padding: 0 30rpx;
  height: 100rpx;
  transition: all 0.3s;
}

.input-wrapper:focus-within {
  background: #fff;
  box-shadow: 0 0 0 2rpx #4F46E5;
}

.input-icon {
  margin-right: 20rpx;
}

.form-input {
  flex: 1;
  height: 100%;
  font-size: 32rpx;
  color: #333;
}

.form-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40rpx;
}

.remember-me {
  display: flex;
  align-items: center;
}

.remember-text {
  font-size: 28rpx;
  color: #666;
  margin-left: 10rpx;
}

.forgot-password {
  font-size: 28rpx;
  color: #4F46E5;
}

.login-btn {
  width: 100%;
  height: 100rpx;
  line-height: 100rpx;
  background: linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%);
  color: #fff;
  font-size: 32rpx;
  font-weight: bold;
  border-radius: 50rpx;
  border: none;
  box-shadow: 0 10rpx 20rpx rgba(79, 70, 229, 0.3);
  transition: all 0.3s;
}

.login-btn:active {
  transform: translateY(2rpx);
  box-shadow: 0 5rpx 10rpx rgba(79, 70, 229, 0.3);
}

.btn-loading {
  opacity: 0.8;
}

.login-tip {
  text-align: center;
  margin-top: 40rpx;
  font-size: 24rpx;
  color: #999;
}

.other-login {
  margin-top: 60rpx;
}

.divider {
  display: flex;
  align-items: center;
  margin-bottom: 40rpx;
}

.divider-line {
  flex: 1;
  height: 1rpx;
  background: rgba(255, 255, 255, 0.3);
}

.divider-text {
  font-size: 24rpx;
  color: rgba(255, 255, 255, 0.8);
  margin: 0 30rpx;
}

.social-login {
  display: flex;
  justify-content: center;
}

.social-item {
  width: 80rpx;
  height: 80rpx;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 20rpx;
  box-shadow: 0 8rpx 16rpx rgba(0, 0, 0, 0.1);
  transition: all 0.3s;
}

.social-item:active {
  transform: scale(0.95);
}
</style>