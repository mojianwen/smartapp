<template>
  <view class="profile-container">
    <!-- 顶部状态栏占位 -->
    <view class="status-bar" :style="{ height: statusBarHeight + 'px' }"></view>
    
    <!-- 个人信息区 -->
    <view class="profile-header">
      <view class="profile-bg"></view>
      <view class="profile-content">
        <view class="avatar-section" @click="handleAvatarClick">
          <image :src="userInfo.avatar" mode="aspectFill" class="avatar-image" />
          <view class="avatar-edit">
            <uni-icons type="camera-filled" size="20" color="#fff"></uni-icons>
          </view>
        </view>
        <text class="username">{{ userInfo.username }}</text>
        <text class="user-desc">{{ userInfo.desc }}</text>
        <view class="user-stats">
          <view class="stat-item">
            <text class="stat-value">{{ userInfo.followCount }}</text>
            <text class="stat-label">关注</text>
          </view>
          <view class="stat-item">
            <text class="stat-value">{{ userInfo.fansCount }}</text>
            <text class="stat-label">粉丝</text>
          </view>
          <view class="stat-item">
            <text class="stat-value">{{ userInfo.likeCount }}</text>
            <text class="stat-label">获赞</text>
          </view>
        </view>
      </view>
    </view>
    
    <!-- 功能列表区 -->
    <scroll-view class="profile-content" scroll-y>
      <!-- 常用功能 -->
      <view class="function-section">
        <view class="section-title">
          <text class="title-text">常用功能</text>
        </view>
        
        <view class="function-list">
          <view class="function-item" v-for="(item, index) in commonFunctionList" :key="index" @click="handleFunctionClick(item)">
            <view class="function-icon" :style="{ background: item.bgColor }">
              <uni-icons :type="item.icon" size="20" color="#fff"></uni-icons>
            </view>
            <text class="function-name">{{ item.name }}</text>
            <view class="function-right">
              <text class="function-value" v-if="item.value">{{ item.value }}</text>
              <uni-icons type="right" size="16" color="#C0C4CC"></uni-icons>
            </view>
          </view>
        </view>
      </view>
      
      <!-- 设置选项 -->
      <view class="setting-section">
        <view class="section-title">
          <text class="title-text">设置选项</text>
        </view>
        
        <view class="setting-list">
          <view class="setting-item" v-for="(item, index) in settingList" :key="index" @click="handleSettingClick(item)">
            <view class="setting-icon">
              <uni-icons :type="item.icon" size="20" color="#606266"></uni-icons>
            </view>
            <text class="setting-name">{{ item.name }}</text>
            <view class="setting-right">
              <text class="setting-value" v-if="item.value">{{ item.value }}</text>
              <uni-icons type="right" size="16" color="#C0C4CC"></uni-icons>
            </view>
          </view>
        </view>
      </view>
      
      <!-- 其他选项 -->
      <view class="other-section">
        <view class="section-title">
          <text class="title-text">其他</text>
        </view>
        
        <view class="other-list">
          <view class="other-item" v-for="(item, index) in otherList" :key="index" @click="handleOtherClick(item)">
            <view class="other-icon">
              <uni-icons :type="item.icon" size="20" color="#606266"></uni-icons>
            </view>
            <text class="other-name">{{ item.name }}</text>
            <uni-icons type="right" size="16" color="#C0C4CC"></uni-icons>
          </view>
        </view>
      </view>
      
      <!-- 退出登录按钮 -->
      <view class="logout-section">
        <button class="logout-btn" @click="handleLogout">退出登录</button>
      </view>
      
      <!-- 版本信息 -->
      <view class="version-info">
        <text class="version-text">SmartApp v1.0.0</text>
      </view>
      
      <!-- 底部安全区域 -->
      <view class="safe-area-bottom" :style="{ height: safeAreaBottom + 'px' }"></view>
    </scroll-view>
    
    <!-- 底部导航栏 -->
    <view class="bottom-nav">
      <view class="nav-item" @click="handleNavClick('/pages/index/index')">
        <uni-icons type="home-filled" size="24" color="#8a8a8a"></uni-icons>
        <text class="nav-text">首页</text>
      </view>
      <view class="nav-item" @click="handleNavClick('/pages/workspace/index')">
        <uni-icons type="grid" size="24" color="#8a8a8a"></uni-icons>
        <text class="nav-text">工作台</text>
      </view>
      <view class="nav-item" @click="handleNavClick('/pages/message/index')">
        <uni-icons type="email" size="24" color="#8a8a8a"></uni-icons>
        <text class="nav-text">消息</text>
      </view>
      <view class="nav-item active" @click="handleNavClick('/pages/profile/index')">
        <uni-icons type="person-filled" size="24" color="#4F46E5"></uni-icons>
        <text class="nav-text active">我的</text>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { requireAuth } from '@/utils/auth'
import { getUserMenuTree } from '@/utils/api/menu'

// 状态栏高度
const statusBarHeight = ref(0)
// 底部安全区域高度
const safeAreaBottom = ref(0)

// 用户信息
const userInfo = ref({
  username: '系统管理员',
  avatar: '/static/avatar/default.jpg',
  desc: '智能管理系统管理员',
  followCount: 128,
  fansCount: 256,
  likeCount: 1024
})

// 加载状态
const loading = ref(false)

// 常用功能列表
const commonFunctionList = ref([
  {
    icon: 'wallet',
    name: '我的钱包',
    value: '￥128.50',
    bgColor: '#409EFF',
    path: '/pages/wallet/index'
  },
  {
    icon: 'star-filled',
    name: '我的收藏',
    value: '23',
    bgColor: '#E6A23C',
    path: '/pages/collection/index'
  },
  {
    icon: 'paperplane',
    name: '我的发布',
    value: '45',
    bgColor: '#67C23A',
    path: '/pages/publish/index'
  },
  {
    icon: 'heart-filled',
    name: '我的点赞',
    value: '168',
    bgColor: '#F56C6C',
    path: '/pages/like/index'
  },
  {
    icon: 'clock',
    name: '浏览历史',
    value: '',
    bgColor: '#909399',
    path: '/pages/history/index'
  },
  {
    icon: 'download',
    name: '下载管理',
    value: '',
    bgColor: '#606266',
    path: '/pages/download/index'
  }
])

// 设置列表
const settingList = ref([
  {
    icon: 'person',
    name: '个人资料',
    value: '',
    path: '/pages/profile/edit'
  },
  {
    icon: 'locked',
    name: '账号安全',
    value: '',
    path: '/pages/security/index'
  },
  {
    icon: 'notification',
    name: '消息通知',
    value: '已开启',
    path: '/pages/notification/index'
  },
  {
    icon: 'moon',
    name: '深色模式',
    value: '关闭',
    path: '/pages/theme/index'
  },
  {
    icon: 'language',
    name: '语言设置',
    value: '简体中文',
    path: '/pages/language/index'
  }
])

// 其他列表
const otherList = ref([
  {
    icon: 'help-filled',
    name: '帮助中心',
    path: '/pages/help/index'
  },
  {
    icon: 'info-filled',
    name: '关于我们',
    path: '/pages/about/index'
  },
  {
    icon: 'phone-filled',
    name: '联系我们',
    path: '/pages/contact/index'
  },
  {
    icon: 'star',
    name: '给我们评分',
    path: ''
  },
  {
    icon: 'redo',
    name: '分享应用',
    path: ''
  }
])

// 获取状态栏高度
const getStatusBarHeight = () => {
  const systemInfo = uni.getSystemInfoSync()
  statusBarHeight.value = systemInfo.statusBarHeight || 0
  safeAreaBottom.value = systemInfo.safeAreaInsets?.bottom || 0
}

// 处理头像点击
const handleAvatarClick = () => {
  uni.chooseImage({
    count: 1,
    sizeType: ['compressed'],
    sourceType: ['album', 'camera'],
    success: (res) => {
      userInfo.value.avatar = res.tempFilePaths[0]
      uni.showToast({
        title: '头像更新成功',
        icon: 'success'
      })
    }
  })
}

// 处理常用功能点击
const handleFunctionClick = (item: any) => {
  if (item.path) {
    uni.navigateTo({
      url: item.path
    })
  } else {
    uni.showToast({
      title: item.name,
      icon: 'none'
    })
  }
}

// 处理设置点击
const handleSettingClick = (item: any) => {
  if (item.path) {
    uni.navigateTo({
      url: item.path
    })
  } else {
    uni.showToast({
      title: item.name,
      icon: 'none'
    })
  }
}

// 处理其他点击
const handleOtherClick = (item: any) => {
  if (item.path) {
    uni.navigateTo({
      url: item.path
    })
  } else if (item.name === '给我们评分') {
    uni.showToast({
      title: '感谢您的支持',
      icon: 'success'
    })
  } else if (item.name === '分享应用') {
    uni.share({
      provider: 'weixin',
      scene: 'WXSceneSession',
      type: 0,
      href: 'https://smartapp.example.com',
      title: 'SmartApp智能管理系统',
      summary: '一款优秀的智能管理系统',
      imageUrl: '/static/logo.png',
      success: () => {
        uni.showToast({
          title: '分享成功',
          icon: 'success'
        })
      },
      fail: () => {
        uni.showToast({
          title: '分享失败',
          icon: 'none'
        })
      }
    })
  } else {
    uni.showToast({
      title: item.name,
      icon: 'none'
    })
  }
}

// 获取用户信息
const getUserInfo = async () => {
  loading.value = true
  try {
    const response = await getUserMenuTree()
    if (response.code === 200) {
      const user = response.data.user || {}
      console.log('获取到用户信息:', user)
      
      // 更新用户信息
      userInfo.value = {
        username: user.nickname || user.username || '用户',
        avatar: user.avatar || '/static/avatar/default.jpg',
        desc: user.desc || '智能管理系统用户',
        followCount: 128,
        fansCount: 256,
        likeCount: 1024
      }
    } else {
      console.error('获取用户信息失败:', response.message)
    }
  } catch (error) {
    console.error('获取用户信息错误:', error)
  } finally {
    loading.value = false
  }
}

// 处理退出登录
const handleLogout = () => {
  uni.showModal({
    title: '提示',
    content: '确定要退出登录吗？',
    success: (res) => {
      if (res.confirm) {
        // 清除登录状态
        uni.removeStorageSync('token')
        
        uni.showToast({
          title: '已退出登录',
          icon: 'success'
        })
        
        // 跳转到登录页
        setTimeout(() => {
          uni.reLaunch({
            url: '/pages/login/index'
          })
        }, 1500)
      }
    }
  })
}

// 处理底部导航点击
const handleNavClick = (url: string) => {
  console.log('导航到:', url)
  uni.navigateTo({
    url: url,
    success: () => {
      console.log('导航成功')
    },
    fail: (error) => {
      console.error('导航失败:', error)
      // 如果navigateTo失败，尝试其他方法
      uni.reLaunch({
        url: url
      })
    }
  })
}

// 页面加载时执行
onLoad(() => {
  // 检查登录状态
  if (!requireAuth()) {
    return
  }
  
  getStatusBarHeight()
  // 获取用户信息
  getUserInfo()
})


</script>

<style scoped>
.profile-container {
  height: 100vh;
  background-color: #f5f7fa;
  display: flex;
  flex-direction: column;
}

.status-bar {
  background-color: #fff;
}

.profile-header {
  position: relative;
  padding: 40rpx 30rpx 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #fff;
  overflow: hidden;
}

.profile-bg {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 100%;
  opacity: 0.1;
  background: url('/static/profile-bg.jpg') no-repeat center;
  background-size: cover;
}

.profile-content {
  text-align: center;
  position: relative;
  z-index: 2;
}

.avatar-section {
  position: relative;
  display: inline-block;
  margin-bottom: 30rpx;
}

.avatar-image {
  width: 120rpx;
  height: 120rpx;
  border-radius: 50%;
  border: 4rpx solid rgba(255, 255, 255, 0.3);
}

.avatar-edit {
  position: absolute;
  right: 0;
  bottom: 0;
  width: 40rpx;
  height: 40rpx;
  border-radius: 50%;
  background: #4F46E5;
  display: flex;
  align-items: center;
  justify-content: center;
}

.username {
  display: block;
  font-size: 36rpx;
  font-weight: bold;
  margin-bottom: 10rpx;
}

.user-desc {
  display: block;
  font-size: 28rpx;
  opacity: 0.8;
  margin-bottom: 30rpx;
}

.user-stats {
  display: flex;
  justify-content: center;
  gap: 60rpx;
}

.stat-item {
  text-align: center;
}

.stat-value {
  display: block;
  font-size: 32rpx;
  font-weight: bold;
  margin-bottom: 4rpx;
}

.stat-label {
  font-size: 24rpx;
  opacity: 0.8;
}

.profile-content {
  flex: 1;
  background-color: #f5f7fa;
  padding: 30rpx;
}

.function-section,
.setting-section,
.other-section {
  background: #fff;
  border-radius: 20rpx;
  margin-bottom: 20rpx;
  overflow: hidden;
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.05);
}

.section-title {
  padding: 30rpx 30rpx 20rpx;
  border-bottom: 1rpx solid #eee;
}

.title-text {
  font-size: 30rpx;
  font-weight: bold;
  color: #333;
}

.function-list,
.setting-list,
.other-list {
  padding: 0 30rpx 20rpx;
}

.function-item,
.setting-item,
.other-item {
  display: flex;
  align-items: center;
  padding: 20rpx 0;
  border-bottom: 1rpx solid #f5f7fa;
}

.function-item:last-child,
.setting-item:last-child,
.other-item:last-child {
  border-bottom: none;
}

.function-icon,
.setting-icon,
.other-icon {
  width: 50rpx;
  height: 50rpx;
  border-radius: 12rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20rpx;
}

.function-name,
.setting-name,
.other-name {
  flex: 1;
  font-size: 28rpx;
  color: #333;
}

.function-right,
.setting-right {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.function-value,
.setting-value {
  font-size: 26rpx;
  color: #999;
  margin-right: 10rpx;
}

.logout-section {
  margin: 40rpx 30rpx 0;
}

.logout-btn {
  width: 100%;
  height: 80rpx;
  line-height: 80rpx;
  background: #F56C6C;
  color: #fff;
  border: none;
  border-radius: 12rpx;
  font-size: 30rpx;
}

.logout-btn::after {
  border: none;
}

.version-info {
  text-align: center;
  padding: 40rpx 0 20rpx;
}

.version-text {
  font-size: 24rpx;
  color: #999;
}

.bottom-nav {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 100rpx;
  background: #fff;
  border-top: 1rpx solid #eee;
  z-index: 999;
  padding-bottom: env(safe-area-inset-bottom);
}

.nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 25%;
  height: 100%;
  cursor: pointer;
}

.nav-item.active {
  background-color: #f8fafc;
}

.nav-text {
  font-size: 24rpx;
  color: #8a8a8a;
  margin-top: 4rpx;
}

.nav-text.active {
  color: #4F46E5;
  font-weight: 500;
}

.safe-area-bottom {
  position: fixed;
  bottom: 100rpx;
  left: 0;
  right: 0;
  background: inherit;
  z-index: 998;
}
</style>