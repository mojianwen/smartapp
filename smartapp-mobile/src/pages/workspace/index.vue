 <template>
  <view class="workspace-container">
    <!-- 顶部状态栏占位 -->
    <view class="status-bar" :style="{ height: statusBarHeight + 'px' }"></view>
    
    <!-- 顶部标题区 -->
    <view class="header">
      <text class="header-title">工作台</text>
      <view class="header-actions">
        <uni-icons type="search" size="22" color="#606266" @click="handleSearch"></uni-icons>
        <uni-icons type="more-filled" size="22" color="#606266" @click="handleMore"></uni-icons>
      </view>
    </view>
    
    <!-- 工作台内容区 -->
    <scroll-view class="workspace-content" scroll-y>
      <!-- 待办事项 -->
      <view class="todo-section">
        <view class="section-header">
          <text class="section-title">待办事项</text>
          <text class="section-more" @click="handleTodoMore">查看全部</text>
        </view>
        
        <view class="todo-list">
          <view class="todo-item" v-for="(item, index) in todoList" :key="index" @click="handleTodoClick(item)">
            <view class="todo-priority" :class="item.priority"></view>
            <view class="todo-content">
              <text class="todo-title">{{ item.title }}</text>
              <text class="todo-desc">{{ item.desc }}</text>
              <text class="todo-time">{{ item.time }}</text>
            </view>
            <view class="todo-status" :class="item.status">{{ item.statusText }}</view>
          </view>
        </view>
      </view>
      
      <!-- 常用功能 -->
      <view class="function-section">
        <view class="section-header">
          <text class="section-title">常用功能</text>
          <text class="section-more" @click="handleFunctionMore">编辑</text>
        </view>
        
        <view class="function-grid">
          <view class="function-item" v-for="(item, index) in functionList" :key="index" @click="handleFunctionClick(item)">
            <view class="function-icon" :style="{ background: item.bgColor }">
              <uni-icons :type="item.icon" size="24" color="#fff"></uni-icons>
            </view>
            <text class="function-text">{{ item.name }}</text>
          </view>
        </view>
      </view>
      
      <!-- 最近访问 -->
      <view class="recent-section">
        <view class="section-header">
          <text class="section-title">最近访问</text>
          <text class="section-more" @click="handleRecentMore">更多</text>
        </view>
        
        <view class="recent-list">
          <view class="recent-item" v-for="(item, index) in recentList" :key="index" @click="handleRecentClick(item)">
            <image :src="item.image" mode="aspectFill" class="recent-image" />
            <view class="recent-content">
              <text class="recent-title">{{ item.title }}</text>
              <text class="recent-desc">{{ item.desc }}</text>
              <text class="recent-time">{{ item.time }}</text>
            </view>
          </view>
        </view>
      </view>
      
      <!-- 工作统计 -->
      <view class="stats-section">
        <view class="section-header">
          <text class="section-title">工作统计</text>
          <text class="section-more" @click="handleStatsMore">详情</text>
        </view>
        
        <view class="stats-chart">
          <view class="chart-item">
            <text class="chart-label">本周完成</text>
            <text class="chart-value">24</text>
            <text class="chart-unit">项</text>
          </view>
          <view class="chart-item">
            <text class="chart-label">本月完成</text>
            <text class="chart-value">86</text>
            <text class="chart-unit">项</text>
          </view>
          <view class="chart-item">
            <text class="chart-label">完成率</text>
            <text class="chart-value">92</text>
            <text class="chart-unit">%</text>
          </view>
        </view>
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
      <view class="nav-item active" @click="handleNavClick('/pages/workspace/index')">
        <uni-icons type="grid" size="24" color="#4F46E5"></uni-icons>
        <text class="nav-text active">工作台</text>
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
import { getUserMenuTree } from '@/utils/api/menu'

// 状态栏高度
const statusBarHeight = ref(0)
// 底部安全区域高度
const safeAreaBottom = ref(0)



// 待办事项列表
const todoList = ref([
  {
    title: '审核用户注册申请',
    desc: '有5个新用户注册待审核',
    time: '2小时前',
    priority: 'high',
    status: 'pending',
    statusText: '待处理'
  },
  {
    title: '系统数据备份',
    desc: '定期数据备份任务',
    time: '1天前',
    priority: 'medium',
    status: 'processing',
    statusText: '处理中'
  },
  {
    title: '更新系统公告',
    desc: '发布新版本更新公告',
    time: '2天前',
    priority: 'low',
    status: 'completed',
    statusText: '已完成'
  }
])

// 常用功能列表
const functionList = ref([])
// 加载状态
const loading = ref(false)

// 最近访问列表
const recentList = ref([
  {
    title: '用户管理',
    desc: '管理系统用户信息',
    image: '/static/recent/user.jpg',
    time: '10分钟前'
  },
  {
    title: '角色权限配置',
    desc: '配置角色权限信息',
    image: '/static/recent/role.jpg',
    time: '2小时前'
  },
  {
    title: '系统日志',
    desc: '查看系统运行日志',
    image: '/static/recent/log.jpg',
    time: '1天前'
  }
])

// 获取状态栏高度
const getStatusBarHeight = () => {
  const systemInfo = uni.getSystemInfoSync()
  statusBarHeight.value = systemInfo.statusBarHeight || 0
  safeAreaBottom.value = systemInfo.safeAreaInsets?.bottom || 0
}

// 处理搜索
const handleSearch = () => {
  uni.showToast({
    title: '搜索功能',
    icon: 'none'
  })
}

// 处理更多
const handleMore = () => {
  uni.showToast({
    title: '更多功能',
    icon: 'none'
  })
}

// 处理待办事项点击
const handleTodoClick = (item: any) => {
  uni.showToast({
    title: item.title,
    icon: 'none'
  })
}

// 处理待办事项更多
const handleTodoMore = () => {
  uni.navigateTo({
    url: '/pages/todo/index'
  })
}

// 处理常用功能点击
const handleFunctionClick = (item: any) => {
  uni.navigateTo({
    url: item.path
  })
}

// 处理常用功能更多
const handleFunctionMore = () => {
  uni.showToast({
    title: '编辑常用功能',
    icon: 'none'
  })
}

// 处理最近访问点击
const handleRecentClick = (item: any) => {
  uni.showToast({
    title: item.title,
    icon: 'none'
  })
}

// 处理最近访问更多
const handleRecentMore = () => {
  uni.navigateTo({
    url: '/pages/recent/index'
  })
}

// 处理工作统计更多
const handleStatsMore = () => {
  uni.navigateTo({
    url: '/pages/stats/index'
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

// 获取用户菜单
const getUserMenus = async () => {
  loading.value = true
  try {
    const response = await getUserMenuTree()
    if (response.code === 200) {
      const menus = response.data.menus || []
      console.log('获取到用户菜单:', menus)
      
      // 转换菜单数据为前端需要的格式
      const functions = convertMenusToFunctions(menus)
      functionList.value = functions
    } else {
      console.error('获取菜单失败:', response.message)
      // 使用默认菜单作为备用
      useDefaultFunctions()
    }
  } catch (error) {
    console.error('获取菜单错误:', error)
    // 使用默认菜单作为备用
    useDefaultFunctions()
  } finally {
    loading.value = false
  }
}

// 转换菜单数据
const convertMenusToFunctions = (menus: any[]) => {
  const functions = []
  const colors = ['#409EFF', '#67C23A', '#E6A23C', '#F56C6C', '#909399', '#606266']
  const icons = ['person-filled', 'staff', 'bars', 'compose', 'calendar', 'email', 'gear', 'help']
  
  menus.forEach((menu, index) => {
    if (menu.menu_type === 'C' || menu.menu_type === 'M') {
      functions.push({
        icon: icons[index % icons.length],
        name: menu.menu_name,
        bgColor: colors[index % colors.length],
        path: menu.path || '/pages/index/index'
      })
    }
  })
  
  return functions
}

// 使用默认菜单
const useDefaultFunctions = () => {
  functionList.value = [
    {
      icon: 'person-filled',
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
      name: '发布公告',
      bgColor: '#F56C6C',
      path: '/pages/notice/create'
    },
    {
      icon: 'calendar',
      name: '日程安排',
      bgColor: '#909399',
      path: '/pages/schedule/index'
    },
    {
      icon: 'email',
      name: '消息中心',
      bgColor: '#606266',
      path: '/pages/message/index'
    }
  ]
}

// 页面加载时执行
onLoad(() => {
  // 检查登录状态
  if (!requireAuth()) {
    return
  }
  
  getStatusBarHeight()
  // 获取用户菜单
  getUserMenus()
})


</script>

<style scoped>
.workspace-container {
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

.workspace-content {
  flex: 1;
  padding: 20rpx;
  margin-bottom: 100rpx;
}

.todo-section, .function-section, .recent-section, .stats-section {
  background: #fff;
  border-radius: 16rpx;
  padding: 30rpx;
  margin-bottom: 20rpx;
  box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.04);
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30rpx;
}

.section-title {
  font-size: 32rpx;
  font-weight: bold;
  color: #303133;
}

.section-more {
  font-size: 26rpx;
  color: #4F46E5;
}

.todo-list {
  margin: 0 -10rpx;
}

.todo-item {
  display: flex;
  align-items: center;
  padding: 20rpx 10rpx;
  border-bottom: 1rpx solid #f0f0f0;
}

.todo-item:last-child {
  border-bottom: none;
}

.todo-priority {
  width: 12rpx;
  height: 40rpx;
  border-radius: 6rpx;
  margin-right: 20rpx;
}

.todo-priority.high {
  background-color: #F56C6C;
}

.todo-priority.medium {
  background-color: #E6A23C;
}

.todo-priority.low {
  background-color: #67C23A;
}

.todo-content {
  flex: 1;
}

.todo-title {
  display: block;
  font-size: 28rpx;
  color: #303133;
  margin-bottom: 8rpx;
}

.todo-desc {
  display: block;
  font-size: 24rpx;
  color: #909399;
  margin-bottom: 8rpx;
}

.todo-time {
  font-size: 22rpx;
  color: #C0C4CC;
}

.todo-status {
  padding: 8rpx 16rpx;
  border-radius: 20rpx;
  font-size: 22rpx;
}

.todo-status.pending {
  background-color: #FDF6EC;
  color: #E6A23C;
}

.todo-status.processing {
  background-color: #F0F9FF;
  color: #409EFF;
}

.todo-status.completed {
  background-color: #F0F9FF;
  color: #67C23A;
}

.function-grid {
  display: flex;
  flex-wrap: wrap;
}

.function-item {
  width: calc(33.33% - 20rpx);
  margin: 10rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20rpx 0;
}

.function-icon {
  width: 60rpx;
  height: 60rpx;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16rpx;
}

.function-text {
  font-size: 26rpx;
  color: #606266;
}

.recent-list {
  margin: 0 -10rpx;
}

.recent-item {
  display: flex;
  align-items: center;
  padding: 20rpx 10rpx;
  border-bottom: 1rpx solid #f0f0f0;
}

.recent-item:last-child {
  border-bottom: none;
}

.recent-image {
  width: 80rpx;
  height: 80rpx;
  border-radius: 12rpx;
  margin-right: 20rpx;
}

.recent-content {
  flex: 1;
}

.recent-title {
  display: block;
  font-size: 28rpx;
  color: #303133;
  margin-bottom: 8rpx;
}

.recent-desc {
  display: block;
  font-size: 24rpx;
  color: #909399;
  margin-bottom: 8rpx;
}

.recent-time {
  font-size: 22rpx;
  color: #C0C4CC;
}

.stats-chart {
  display: flex;
  justify-content: space-around;
  padding: 20rpx 0;
}

.chart-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.chart-label {
  font-size: 24rpx;
  color: #909399;
  margin-bottom: 10rpx;
}

.chart-value {
  font-size: 48rpx;
  font-weight: bold;
  color: #409EFF;
  margin-bottom: 5rpx;
}

.chart-unit {
  font-size: 22rpx;
  color: #C0C4CC;
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