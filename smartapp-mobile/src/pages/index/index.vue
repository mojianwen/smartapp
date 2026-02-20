<template>
  <view class="home-container">
    <!-- 顶部状态栏占位 -->
    <view class="status-bar" :style="{ height: statusBarHeight + 'px' }"></view>
    
    <!-- 头部Banner区 -->
    <view class="header-banner">
      <swiper class="banner-swiper" indicator-dots indicator-color="rgba(255,255,255,0.5)" indicator-active-color="#fff" autoplay circular>
        <swiper-item v-for="(item, index) in bannerList" :key="index">
          <image :src="item.image" mode="aspectFill" class="banner-image" />
          <view class="banner-content">
            <text class="banner-title">{{ item.title }}</text>
            <text class="banner-desc">{{ item.desc }}</text>
          </view>
        </swiper-item>
      </swiper>
    </view>
    
    <!-- 中间指标展示区 -->
    <view class="stats-section">
      <view class="section-title">
        <text class="title-text">数据概览</text>
        <text class="update-time">更新时间: {{ updateTime }}</text>
      </view>
      
      <view class="stats-grid">
        <view class="stat-card" v-for="(stat, index) in statsList" :key="index" @click="handleStatClick(stat)">
          <view class="stat-icon" :style="{ background: stat.bgColor }">
            <uni-icons :type="stat.icon" size="24" color="#fff"></uni-icons>
          </view>
          <view class="stat-info">
            <text class="stat-value">{{ stat.value }}</text>
            <text class="stat-label">{{ stat.label }}</text>
            <view class="stat-change" :class="stat.trend">
              <uni-icons :type="stat.trend === 'up' ? 'up' : 'down'" size="12" :color="stat.trend === 'up' ? '#67C23A' : '#F56C6C'"></uni-icons>
              <text>{{ stat.change }}</text>
            </view>
          </view>
        </view>
      </view>
    </view>
    
    <!-- 快捷功能区 -->
    <view class="quick-section">
      <view class="section-title">
        <text class="title-text">快捷功能</text>
        <text class="more-text" @click="handleMoreClick">更多</text>
      </view>
      
      <view class="quick-grid">
        <view class="quick-item" v-for="(item, index) in quickList" :key="index" @click="handleQuickClick(item)">
          <view class="quick-icon" :style="{ background: item.bgColor }">
            <uni-icons :type="item.icon" size="24" color="#fff"></uni-icons>
          </view>
          <text class="quick-text">{{ item.name }}</text>
        </view>
      </view>
    </view>
    
    <!-- 最新动态 -->
    <view class="news-section">
      <view class="section-title">
        <text class="title-text">最新动态</text>
        <text class="more-text" @click="handleNewsMore">查看全部</text>
      </view>
      
      <view class="news-list">
        <view class="news-item" v-for="(item, index) in newsList" :key="index" @click="handleNewsClick(item)">
          <view class="news-content">
            <text class="news-title">{{ item.title }}</text>
            <text class="news-desc">{{ item.desc }}</text>
            <text class="news-time">{{ item.time }}</text>
          </view>
          <view class="news-badge" v-if="item.isNew">新</view>
        </view>
      </view>
    </view>
    
    <!-- 底部安全区域 -->
    <view class="safe-area-bottom" :style="{ height: safeAreaBottom + 'px' }"></view>
    
    <!-- 底部导航栏 -->
    <view class="bottom-nav">
      <view class="nav-item active" @click="handleNavClick('/pages/index/index')">
        <uni-icons type="home-filled" size="24" color="#4F46E5"></uni-icons>
        <text class="nav-text active">首页</text>
      </view>
      <view class="nav-item" @click="handleNavClick('/pages/workspace/index')">
        <uni-icons type="grid" size="24" color="#8a8a8a"></uni-icons>
        <text class="nav-text">工作台</text>
      </view>
      <view class="nav-item" @click="handleNavClick('/pages/message/index')">
        <uni-icons type="email" size="24" color="#8a8a8a"></uni-icons>
        <text class="nav-text">消息</text>
      </view>
      <view class="nav-item" @click="handleNavClick('/pages/profile/index')">
        <uni-icons type="person-filled" size="24" color="#8a8a8a"></uni-icons>
        <text class="nav-text">我的</text>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { requireAuth } from '@/utils/auth'

// 状态栏高度
const statusBarHeight = ref(0)
// 底部安全区域高度
const safeAreaBottom = ref(0)

// 更新时间
const updateTime = ref('')



// Banner数据
const bannerList = ref([
  {
    image: '/static/banner/banner1.jpg',
    title: 'SmartApp 2.0 全新上线',
    desc: '全新UI设计，更优用户体验'
  },
  {
    image: '/static/banner/banner2.jpg',
    title: '智能数据分析功能',
    desc: '实时数据监控，智能预警提醒'
  },
  {
    image: '/static/banner/banner3.jpg',
    title: '移动端全面适配',
    desc: '随时随地，轻松管理'
  }
])

// 指标数据
const statsList = ref([
  {
    icon: 'person-filled',
    label: '用户总数',
    value: '1,234',
    change: '12%',
    trend: 'up',
    bgColor: '#409EFF'
  },
  {
    icon: 'staff',
    label: '活跃用户',
    value: '892',
    change: '8%',
    trend: 'up',
    bgColor: '#67C23A'
  },
  {
    icon: 'bars',
    label: '今日访问',
    value: '456',
    change: '3%',
    trend: 'down',
    bgColor: '#E6A23C'
  },
  {
    icon: 'gear-filled',
    label: '系统状态',
    value: '正常',
    change: '0%',
    trend: 'up',
    bgColor: '#F56C6C'
  }
])

// 快捷功能
const quickList = ref([
  {
    icon: 'person',
    name: '用户管理',
    bgColor: '#409EFF',
    path: '/pages/system/user/index'
  },
  {
    icon: 'staff',
    name: '角色管理',
    bgColor: '#67C23A',
    path: '/pages/system/role/index'
  },
  {
    icon: 'bars',
    name: '菜单管理',
    bgColor: '#E6A23C',
    path: '/pages/system/menu/index'
  },
  {
    icon: 'compose',
    name: '数据报表',
    bgColor: '#F56C6C',
    path: '/pages/report/index'
  },
  {
    icon: 'gear',
    name: '系统设置',
    bgColor: '#909399',
    path: '/pages/setting/index'
  },
  {
    icon: 'help',
    name: '帮助中心',
    bgColor: '#606266',
    path: '/pages/help/index'
  }
])

// 最新动态
const newsList = ref([
  {
    title: '系统升级通知',
    desc: '系统将于今晚22:00-23:00进行升级维护',
    time: '2小时前',
    isNew: true
  },
  {
    title: '新功能上线',
    desc: '数据导出功能已上线，支持多格式导出',
    time: '1天前',
    isNew: true
  },
  {
    title: '安全提醒',
    desc: '请定期更换密码，确保账户安全',
    time: '3天前',
    isNew: false
  }
])

// 获取状态栏高度
const getStatusBarHeight = () => {
  const systemInfo = uni.getSystemInfoSync()
  statusBarHeight.value = systemInfo.statusBarHeight || 0
  safeAreaBottom.value = systemInfo.safeAreaInsets?.bottom || 0
}

// 格式化更新时间
const formatUpdateTime = () => {
  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')
  const hour = String(now.getHours()).padStart(2, '0')
  const minute = String(now.getMinutes()).padStart(2, '0')
  
  updateTime.value = `${year}-${month}-${day} ${hour}:${minute}`
}

// 处理指标点击
const handleStatClick = (stat: any) => {
  uni.showToast({
    title: `查看${stat.label}详情`,
    icon: 'none'
  })
}

// 处理更多点击
const handleMoreClick = () => {
  uni.showToast({
    title: '查看更多数据',
    icon: 'none'
  })
}

// 处理快捷功能点击
const handleQuickClick = (item: any) => {
  uni.navigateTo({
    url: item.path
  })
}

// 处理新闻点击
const handleNewsClick = (item: any) => {
  uni.showToast({
    title: item.title,
    icon: 'none'
  })
}

// 处理新闻更多
const handleNewsMore = () => {
  uni.navigateTo({
    url: '/pages/news/index'
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
  console.log('首页开始加载...')
  try {
    // 检查登录状态
    // 立即检查登录状态
      // 登录检查已在App.vue中处理
      // 登录检查已在App.vue中处理
      

      
      // 登录检查已在App.vue中处理
      getStatusBarHeight()
      formatUpdateTime()
      console.log('首页初始化完成')
    

  } catch (error) {
    console.error('首页加载出错:', error)
    uni.showToast({
      title: '页面加载失败',
      icon: 'none'
    })
  }
})


</script>

<style scoped>
.home-container {
  min-height: 100vh;
  background-color: #f5f7fa;
}

.status-bar {
  background-color: #fff;
}

.header-banner {
  height: 360rpx;
  position: relative;
}

.banner-swiper {
  height: 100%;
}

.banner-image {
  width: 100%;
  height: 100%;
}

.banner-content {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 30rpx;
  background: linear-gradient(to top, rgba(0,0,0,0.7), transparent);
}

.banner-title {
  display: block;
  font-size: 32rpx;
  font-weight: bold;
  color: #fff;
  margin-bottom: 10rpx;
}

.banner-desc {
  display: block;
  font-size: 24rpx;
  color: rgba(255, 255, 255, 0.8);
}

.stats-section, .quick-section, .news-section {
  margin: 20rpx;
  background: #fff;
  border-radius: 16rpx;
  padding: 30rpx;
  box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.04);
}

.section-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30rpx;
}

.title-text {
  font-size: 32rpx;
  font-weight: bold;
  color: #303133;
}

.update-time, .more-text {
  font-size: 24rpx;
  color: #909399;
}

.more-text {
  color: #4F46E5;
}

.stats-grid {
  display: flex;
  flex-wrap: wrap;
  margin: 0 -10rpx;
}

.stat-card {
  width: calc(50% - 20rpx);
  margin: 10rpx;
  padding: 30rpx;
  background: #f8f9fa;
  border-radius: 12rpx;
  display: flex;
  align-items: center;
}

.stat-icon {
  width: 60rpx;
  height: 60rpx;
  border-radius: 12rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20rpx;
}

.stat-info {
  flex: 1;
}

.stat-value {
  display: block;
  font-size: 36rpx;
  font-weight: bold;
  color: #303133;
}

.stat-label {
  display: block;
  font-size: 24rpx;
  color: #909399;
  margin: 8rpx 0;
}

.stat-change {
  display: flex;
  align-items: center;
  font-size: 22rpx;
}

.stat-change.up {
  color: #67C23A;
}

.stat-change.down {
  color: #F56C6C;
}

.stat-change text {
  margin-left: 4rpx;
}

.quick-grid {
  display: flex;
  flex-wrap: wrap;
}

.quick-item {
  width: calc(33.33% - 20rpx);
  margin: 10rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20rpx 0;
}

.quick-icon {
  width: 60rpx;
  height: 60rpx;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16rpx;
}

.quick-text {
  font-size: 26rpx;
  color: #606266;
}

.news-list {
  margin: 0 -10rpx;
}

.news-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20rpx 10rpx;
  border-bottom: 1rpx solid #f0f0f0;
}

.news-item:last-child {
  border-bottom: none;
}

.news-content {
  flex: 1;
}

.news-title {
  display: block;
  font-size: 28rpx;
  color: #303133;
  margin-bottom: 8rpx;
}

.news-desc {
  display: block;
  font-size: 24rpx;
  color: #909399;
  margin-bottom: 8rpx;
}

.news-time {
  font-size: 22rpx;
  color: #C0C4CC;
}

.news-badge {
  padding: 4rpx 12rpx;
  background: #F56C6C;
  color: #fff;
  font-size: 20rpx;
  border-radius: 20rpx;
}

.safe-area-bottom {
  background: #f5f7fa;
}

.bottom-nav {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100rpx;
  background-color: #fff;
  display: flex;
  justify-content: space-around;
  align-items: center;
  box-shadow: 0 -2rpx 10rpx rgba(0, 0, 0, 0.05);
  z-index: 999;
}

.nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 10rpx 0;
}

.nav-text {
  font-size: 22rpx;
  color: #8a8a8a;
  margin-top: 6rpx;
}

.nav-text.active {
  color: #4F46E5;
}
</style>