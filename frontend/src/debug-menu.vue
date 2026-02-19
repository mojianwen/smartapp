<template>
  <div class="debug-container">
    <h2>菜单调试信息</h2>
    <div class="debug-section">
      <h3>原始菜单数据</h3>
      <pre>{{ JSON.stringify(originalMenus, null, 2) }}</pre>
    </div>
    <div class="debug-section">
      <h3>处理后的菜单数据</h3>
      <pre>{{ JSON.stringify(processedMenus, null, 2) }}</pre>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useUserStore } from '@/store/user'

const userStore = useUserStore()

const originalMenus = computed(() => userStore.menus || [])

const processedMenus = computed(() => {
  const dynamicMenus = userStore.menus || []
  
  const dashboardMenu = {
    path: '/dashboard',
    meta: {
      title: '系统门户',
      icon: 'HomeFilled'
    }
  }
  
  // 构建菜单树结构
  const buildMenuTree = (menus, parentId = 0, parentPath = '') => {
    return menus
      .filter(menu => menu.parentId === parentId)
      .map(menu => {
        const children = buildMenuTree(menus, menu.id, menu.path)
        const result = {
          path: menu.path || '',
          meta: {
            title: menu.menuName,
            icon: menu.icon || ''
          }
        }
        
        // 目录类型(M)或菜单类型(C)如果有子菜单，则添加children属性
        if ((menu.menuType === 'M' || menu.menuType === 'C') && children.length > 0) {
          result.children = children
        }
        
        return result
      })
  }
  
  // 过滤掉按钮类型的菜单
  const filteredMenus = dynamicMenus
    .filter(menu => menu.menuType !== 'F')
  
  const menuTree = buildMenuTree(filteredMenus)
  
  return [dashboardMenu, ...menuTree]
})
</script>

<style scoped>
.debug-container {
  padding: 20px;
  max-height: 80vh;
  overflow-y: auto;
}

.debug-section {
  margin-bottom: 30px;
}

pre {
  background: #f5f5f5;
  padding: 15px;
  border-radius: 4px;
  white-space: pre-wrap;
  word-break: break-all;
  max-height: 400px;
  overflow-y: auto;
}
</style>
