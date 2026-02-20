<template>
  <div class="dashboard-container">
    <el-row :gutter="20">
      <el-col :span="6">
        <el-card class="stat-card">
          <div class="stat-content">
            <div class="stat-icon" style="background: #409EFF">
              <el-icon><User /></el-icon>
            </div>
            <div class="stat-info">
              <div class="stat-value">{{ stats.userCount }}</div>
              <div class="stat-label">用户总数</div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="stat-card">
          <div class="stat-content">
            <div class="stat-icon" style="background: #67C23A">
              <el-icon><UserFilled /></el-icon>
            </div>
            <div class="stat-info">
              <div class="stat-value">{{ stats.roleCount }}</div>
              <div class="stat-label">角色总数</div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="stat-card">
          <div class="stat-content">
            <div class="stat-icon" style="background: #E6A23C">
              <el-icon><Menu /></el-icon>
            </div>
            <div class="stat-info">
              <div class="stat-value">{{ stats.menuCount }}</div>
              <div class="stat-label">菜单总数</div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="stat-card">
          <div class="stat-content">
            <div class="stat-icon" style="background: #F56C6C">
              <el-icon><Setting /></el-icon>
            </div>
            <div class="stat-info">
              <div class="stat-value">1.0.0</div>
              <div class="stat-label">系统版本</div>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <el-row :gutter="20" style="margin-top: 20px">
      <el-col :span="12">
        <el-card>
          <template #header>
            <span>快捷入口</span>
          </template>
          <div class="quick-links">
            <div class="quick-link" @click="$router.push('/system/user')">
              <el-icon><User /></el-icon>
              <span>用户管理</span>
            </div>
            <div class="quick-link" @click="$router.push('/system/role')">
              <el-icon><UserFilled /></el-icon>
              <span>角色管理</span>
            </div>
            <div class="quick-link" @click="$router.push('/system/menu')">
              <el-icon><Menu /></el-icon>
              <span>菜单管理</span>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card>
          <template #header>
            <span>系统信息</span>
          </template>
          <el-descriptions :column="1" border>
            <el-descriptions-item label="系统名称">SmartApp 系统管理平台</el-descriptions-item>
            <el-descriptions-item label="前端框架">Vue 3 + Vite + Element Plus</el-descriptions-item>
            <el-descriptions-item label="后端框架">Spring Boot 3 + MyBatis-Plus</el-descriptions-item>
            <el-descriptions-item label="数据库">MySQL 8.0</el-descriptions-item>
          </el-descriptions>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { reactive, onMounted } from 'vue'
import { getUserList } from '@/api/user'
import { getRoleList } from '@/api/role'
import { getMenuList } from '@/api/menu'
import { useUserStore } from '@/store/user'

const userStore = useUserStore()

const stats = reactive({
  userCount: 0,
  roleCount: 0,
  menuCount: 0
})

onMounted(async () => {
  try {
    // 重新获取用户信息以刷新菜单数据
    await userStore.getUserInfo()

    const [users, roles, menus] = await Promise.all([
      getUserList(),
      getRoleList(),
      getMenuList()
    ])
    stats.userCount = users.data?.length || 0
    stats.roleCount = roles.data?.length || 0
    stats.menuCount = menus.data?.length || 0
  } catch (error) {
    console.error(error)
  }
})
</script>

<style scoped>
.dashboard-container {
  padding: 0;
}

.stat-card {
  height: 120px;
}

.stat-content {
  display: flex;
  align-items: center;
}

.stat-icon {
  width: 60px;
  height: 60px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
}

.stat-icon .el-icon {
  font-size: 28px;
  color: #fff;
}

.stat-info {
  flex: 1;
}

.stat-value {
  font-size: 28px;
  font-weight: bold;
  color: #333;
}

.stat-label {
  font-size: 14px;
  color: #999;
  margin-top: 5px;
}

.quick-links {
  display: flex;
  justify-content: space-around;
}

.quick-link {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  cursor: pointer;
  border-radius: 8px;
  transition: all 0.3s;
}

.quick-link:hover {
  background: #f5f7fa;
}

.quick-link .el-icon {
  font-size: 32px;
  color: #409EFF;
  margin-bottom: 10px;
}

.quick-link span {
  font-size: 14px;
  color: #666;
}
</style>
