/**
 * 简单的状态管理
 */
import { ref } from 'vue'

// 登录状态
const isLoggedIn = ref(false)

// 当前页面
const currentPage = ref('login')

// 设置登录状态
export const setLoggedIn = (status: boolean) => {
  isLoggedIn.value = status
}

// 获取登录状态
export const getLoggedIn = () => {
  return isLoggedIn.value
}

// 设置当前页面
export const setCurrentPage = (page: string) => {
  currentPage.value = page
}

// 获取当前页面
export const getCurrentPage = () => {
  return currentPage.value
}

// 导出响应式状态
export { isLoggedIn, currentPage }