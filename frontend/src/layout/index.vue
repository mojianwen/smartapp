<template>
  <el-container class="layout-container">
    <el-aside :width="isCollapse ? '64px' : '220px'" class="layout-aside">
      <div class="logo">
        <span v-if="!isCollapse">SmartApp</span>
        <span v-else>SA</span>
      </div>
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :router="true"
        background-color="#304156"
        text-color="#bfcbd9"
        active-text-color="#409EFF"
        >
          <template v-for="menu in menuList" :key="menu.path || menu.meta?.title">
            <el-sub-menu v-if="menu.children && menu.children.length" :index="menu.path || menu.meta?.title">
              <template #title>
                <el-icon><component :is="menu.meta?.icon" /></el-icon>
                <span>{{ menu.meta?.title }}</span>
              </template>
              <el-menu-item 
                v-for="child in menu.children" 
                :key="child.path || child.meta?.title" 
                :index="child.path"
              >
                <el-icon><component :is="child.meta?.icon" /></el-icon>
                <span>{{ child.meta?.title }}</span>
              </el-menu-item>
            </el-sub-menu>
            <el-menu-item v-else :index="menu.path">
              <el-icon><component :is="menu.meta?.icon" /></el-icon>
              <span>{{ menu.meta?.title }}</span>
            </el-menu-item>
          </template>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header class="layout-header">
        <div class="header-left">
          <el-icon class="collapse-btn" @click="toggleCollapse">
            <Fold v-if="!isCollapse" />
            <Expand v-else />
          </el-icon>
        </div>
        <div class="header-right">
          <el-dropdown @command="handleCommand">
            <span class="user-info">
              <el-avatar :size="32" :src="userStore.avatar">
                {{ userStore.nickname?.charAt(0) }}
              </el-avatar>
              <span class="username">{{ userStore.nickname }}</span>
              <el-icon><ArrowDown /></el-icon>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="logout">
                  <el-icon><SwitchButton /></el-icon>
                  退出登录
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </el-header>
      <el-main class="layout-main">
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useUserStore } from '@/store/user'

const route = useRoute()
const userStore = useUserStore()

const isCollapse = ref(false)

const activeMenu = computed(() => route.path)

const menuList = computed(() => {
  const dynamicMenus = userStore.menus || []
  
  const dashboardMenu = {
    path: '/dashboard',
    meta: {
      title: '系统门户',
      icon: 'HomeFilled'
    }
  }
  
  // 直接使用后端返回的树形结构，不需要重新构建
  const convertMenuTree = (menus) => {
    return menus
      .filter(menu => menu.menuType !== 'F') // 过滤按钮类型
      .map(menu => {
        const convertedMenu = {
          path: menu.path || '',
          meta: {
            title: menu.menuName || menu.title || '未知菜单',
            icon: menu.icon || menu.meta?.icon || ''
          }
        }
        
        // 如果有子菜单，递归转换
        if (menu.children && menu.children.length > 0) {
          convertedMenu.children = convertMenuTree(menu.children)
        }
        
        return convertedMenu
      })
  }
  
  const convertedMenus = convertMenuTree(dynamicMenus)
  
  return [dashboardMenu, ...convertedMenus]
})

const toggleCollapse = () => {
  isCollapse.value = !isCollapse.value
}

const handleCommand = (command) => {
  if (command === 'logout') {
    userStore.logout()
  }
}
</script>

<style scoped>
.layout-container {
  height: 100%;
}

.layout-aside {
  background-color: #304156;
  transition: width 0.3s;
  overflow: hidden;
}

.logo {
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 20px;
  font-weight: bold;
  background-color: #263445;
}

.layout-header {
  background-color: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
}

.header-left {
  display: flex;
  align-items: center;
}

.collapse-btn {
  font-size: 20px;
  cursor: pointer;
}

.header-right {
  display: flex;
  align-items: center;
}

.user-info {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.username {
  margin: 0 8px;
}

.layout-main {
  background-color: #f0f2f5;
  padding: 20px;
}
</style>
