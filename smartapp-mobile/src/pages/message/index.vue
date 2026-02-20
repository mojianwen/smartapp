<template>
  <view class="message-container">
    <!-- 顶部状态栏占位 -->
    <view class="status-bar" :style="{ height: statusBarHeight + 'px' }"></view>
    
    <!-- 顶部标题区 -->
    <view class="header">
      <text class="header-title">消息</text>
      <view class="header-actions">
        <uni-icons type="search" size="22" color="#606266" @click="handleSearch"></uni-icons>
        <uni-icons type="plus-filled" size="22" color="#606266" @click="handleAdd"></uni-icons>
      </view>
    </view>
    
    <!-- 消息标签页 -->
    <view class="message-tabs">
      <view 
        class="tab-item" 
        :class="{ active: activeTab === index }" 
        v-for="(tab, index) in tabList" 
        :key="index"
        @click="switchTab(index)"
      >
        <text class="tab-text">{{ tab.name }}</text>
        <view class="tab-badge" v-if="tab.count > 0">{{ tab.count }}</view>
      </view>
    </view>
    
    <!-- 消息内容区 -->
    <scroll-view class="message-content" scroll-y @scrolltolower="loadMore">
      <!-- 全部消息 -->
      <view v-if="activeTab === 0" class="message-list">
        <view class="message-item" v-for="(item, index) in allMessageList" :key="index" @click="handleMessageClick(item)">
          <view class="message-avatar">
            <image :src="item.avatar" mode="aspectFill" class="avatar-image" />
            <view class="online-status" v-if="item.isOnline"></view>
          </view>
          <view class="message-main">
            <view class="message-header">
              <text class="message-title">{{ item.title }}</text>
              <text class="message-time">{{ item.time }}</text>
            </view>
            <text class="message-desc">{{ item.desc }}</text>
            <view class="message-tags" v-if="item.tags && item.tags.length > 0">
              <text class="message-tag" v-for="(tag, tagIndex) in item.tags" :key="tagIndex">{{ tag }}</text>
            </view>
          </view>
          <view class="message-status">
            <view class="unread-dot" v-if="!item.isRead"></view>
          </view>
        </view>
      </view>
      
      <!-- 系统通知 -->
      <view v-if="activeTab === 1" class="message-list">
        <view class="message-item" v-for="(item, index) in systemMessageList" :key="index" @click="handleMessageClick(item)">
          <view class="message-avatar system">
            <uni-icons :type="item.icon" size="24" color="#fff"></uni-icons>
          </view>
          <view class="message-main">
            <view class="message-header">
              <text class="message-title">{{ item.title }}</text>
              <text class="message-time">{{ item.time }}</text>
            </view>
            <text class="message-desc">{{ item.desc }}</text>
          </view>
          <view class="message-status">
            <view class="unread-dot" v-if="!item.isRead"></view>
          </view>
        </view>
      </view>
      
      <!-- 私信消息 -->
      <view v-if="activeTab === 2" class="message-list">
        <view class="message-item" v-for="(item, index) in privateMessageList" :key="index" @click="handleMessageClick(item)">
          <view class="message-avatar">
            <image :src="item.avatar" mode="aspectFill" class="avatar-image" />
            <view class="online-status" v-if="item.isOnline"></view>
          </view>
          <view class="message-main">
            <view class="message-header">
              <text class="message-title">{{ item.title }}</text>
              <text class="message-time">{{ item.time }}</text>
            </view>
            <text class="message-desc">{{ item.desc }}</text>
          </view>
          <view class="message-status">
            <view class="unread-dot" v-if="!item.isRead"></view>
            <view class="message-count" v-if="item.unreadCount > 0">{{ item.unreadCount }}</view>
          </view>
        </view>
      </view>
      
      <!-- 加载更多 -->
      <view class="load-more" v-if="loading">
        <text>加载中...</text>
      </view>
      
      <!-- 没有更多数据 -->
      <view class="no-more" v-if="!loading && !hasMore">
        <text>没有更多消息了</text>
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
      <view class="nav-item active" @click="handleNavClick('/pages/message/index')">
        <uni-icons type="email-filled" size="24" color="#4F46E5"></uni-icons>
        <text class="nav-text active">消息</text>
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



// 当前激活的标签页
const activeTab = ref(0)

// 加载状态
const loading = ref(false)
// 是否有更多数据
const hasMore = ref(true)

// 标签页列表
const tabList = ref([
  { name: '全部', count: 12 },
  { name: '系统通知', count: 5 },
  { name: '私信', count: 7 }
])

// 全部消息列表
const allMessageList = ref([
  {
    title: '系统升级通知',
    desc: '系统将于今晚22:00-23:00进行升级维护，请提前保存工作内容',
    time: '2小时前',
    avatar: '/static/avatar/system.jpg',
    isRead: false,
    tags: ['重要', '系统'],
    isSystem: true,
    icon: 'notification'
  },
  {
    title: '张三',
    desc: '你好，关于用户权限配置的问题，我想咨询一下...',
    time: '3小时前',
    avatar: '/static/avatar/user1.jpg',
    isRead: false,
    isOnline: true,
    unreadCount: 2
  },
  {
    title: '新功能上线',
    desc: '数据导出功能已上线，支持Excel、PDF等多种格式导出',
    time: '1天前',
    avatar: '/static/avatar/system.jpg',
    isRead: true,
    tags: ['新功能'],
    isSystem: true,
    icon: 'star-filled'
  },
  {
    title: '李四',
    desc: '会议纪要已发送，请查收',
    time: '2天前',
    avatar: '/static/avatar/user2.jpg',
    isRead: true,
    isOnline: false
  }
])

// 系统通知列表
const systemMessageList = ref([
  {
    title: '系统升级通知',
    desc: '系统将于今晚22:00-23:00进行升级维护，请提前保存工作内容',
    time: '2小时前',
    isRead: false,
    icon: 'notification',
    tags: ['重要', '系统']
  },
  {
    title: '新功能上线',
    desc: '数据导出功能已上线，支持Excel、PDF等多种格式导出',
    time: '1天前',
    isRead: true,
    icon: 'star-filled',
    tags: ['新功能']
  },
  {
    title: '安全提醒',
    desc: '请定期更换密码，确保账户安全',
    time: '3天前',
    isRead: true,
    icon: 'locked'
  }
])

// 私信消息列表
const privateMessageList = ref([
  {
    title: '张三',
    desc: '你好，关于用户权限配置的问题，我想咨询一下...',
    time: '3小时前',
    avatar: '/static/avatar/user1.jpg',
    isRead: false,
    isOnline: true,
    unreadCount: 2
  },
  {
    title: '李四',
    desc: '会议纪要已发送，请查收',
    time: '2天前',
    avatar: '/static/avatar/user2.jpg',
    isRead: true,
    isOnline: false
  },
  {
    title: '王五',
    desc: '项目进度已更新，请查看',
    time: '5天前',
    avatar: '/static/avatar/user3.jpg',
    isRead: true,
    isOnline: true
  }
])

// 获取状态栏高度
const getStatusBarHeight = () => {
  const systemInfo = uni.getSystemInfoSync()
  statusBarHeight.value = systemInfo.statusBarHeight || 0
  safeAreaBottom.value = systemInfo.safeAreaInsets?.bottom || 0
}

// 切换标签页
const switchTab = (index: number) => {
  activeTab.value = index
}

// 处理搜索
const handleSearch = () => {
  uni.showToast({
    title: '搜索消息',
    icon: 'none'
  })
}

// 处理添加
const handleAdd = () => {
  uni.showToast({
    title: '新建消息',
    icon: 'none'
  })
}

// 处理消息点击
const handleMessageClick = (item: any) => {
  if (item.isSystem) {
    uni.showToast({
      title: `查看系统通知: ${item.title}`,
      icon: 'none'
    })
  } else {
    uni.navigateTo({
      url: `/pages/chat/index?title=${item.title}`
    })
  }
}

// 加载更多数据
const loadMore = () => {
  if (loading.value || !hasMore.value) return
  
  loading.value = true
  
  // 模拟加载
  setTimeout(() => {
    loading.value = false
    // 这里可以添加更多数据
    // hasMore.value = false
  }, 1000)
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
})


</script>

<style scoped>
.message-container {
  height: 100vh;
  background-color: #f5f7fa;
  display: flex;
  flex-direction: column;
}

.status-bar {
  background-color: #fff;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20rpx 30rpx;
  background-color: #fff;
  box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.04);
}

.header-title {
  font-size: 36rpx;
  font-weight: bold;
  color: #303133;
}

.header-actions {
  display: flex;
  align-items: center;
}

.header-actions .uni-icons {
  margin-left: 30rpx;
}

.message-tabs {
  display: flex;
  background-color: #fff;
  padding: 0 30rpx;
  border-bottom: 1rpx solid #f0f0f0;
}

.tab-item {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 30rpx 0;
  position: relative;
}

.tab-item.active .tab-text {
  color: #4F46E5;
  font-weight: bold;
}

.tab-item.active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 60rpx;
  height: 4rpx;
  background-color: #4F46E5;
  border-radius: 2rpx;
}

.tab-text {
  font-size: 28rpx;
  color: #606266;
  transition: all 0.3s;
}

.tab-badge {
  position: absolute;
  top: 20rpx;
  right: calc(50% - 40rpx);
  min-width: 32rpx;
  height: 32rpx;
  padding: 0 8rpx;
  background-color: #F56C6C;
  color: #fff;
  font-size: 20rpx;
  border-radius: 16rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}

.message-content {
  flex: 1;
}

.message-list {
  padding: 0 20rpx;
}

.message-item {
  display: flex;
  align-items: center;
  padding: 30rpx 0;
  border-bottom: 1rpx solid #f0f0f0;
}

.message-item:last-child {
  border-bottom: none;
}

.message-avatar {
  width: 80rpx;
  height: 80rpx;
  border-radius: 50%;
  margin-right: 20rpx;
  position: relative;
  overflow: hidden;
}

.message-avatar.system {
  background-color: #409EFF;
  display: flex;
  align-items: center;
  justify-content: center;
}

.avatar-image {
  width: 100%;
  height: 100%;
}

.online-status {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 20rpx;
  height: 20rpx;
  background-color: #67C23A;
  border-radius: 50%;
  border: 4rpx solid #fff;
}

.message-main {
  flex: 1;
  min-width: 0;
}

.message-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10rpx;
}

.message-title {
  font-size: 30rpx;
  color: #303133;
  font-weight: bold;
}

.message-time {
  font-size: 24rpx;
  color: #C0C4CC;
}

.message-desc {
  font-size: 26rpx;
  color: #606266;
  margin-bottom: 10rpx;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.message-tags {
  display: flex;
  flex-wrap: wrap;
}

.message-tag {
  padding: 4rpx 12rpx;
  background-color: #F0F9FF;
  color: #409EFF;
  font-size: 20rpx;
  border-radius: 20rpx;
  margin-right: 10rpx;
  margin-bottom: 10rpx;
}

.message-status {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: 20rpx;
}

.unread-dot {
  width: 16rpx;
  height: 16rpx;
  background-color: #F56C6C;
  border-radius: 50%;
  margin-bottom: 10rpx;
}

.message-count {
  min-width: 32rpx;
  height: 32rpx;
  padding: 0 8rpx;
  background-color: #F56C6C;
  color: #fff;
  font-size: 20rpx;
  border-radius: 16rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}

.load-more, .no-more {
  padding: 30rpx;
  text-align: center;
  font-size: 26rpx;
  color: #909399;
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