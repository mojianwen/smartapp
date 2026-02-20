/**
 * 认证相关的工具函数
 */

/**
 * 检查登录状态
 */
export const checkLogin = (): boolean => {
  const token = uni.getStorageSync('token')
  return !!token
}

/**
 * 跳转到登录页
 */
export const redirectToLogin = () => {
  uni.reLaunch({
    url: '/pages/login/index'
  })
}

/**
 * 检查登录状态，未登录则跳转到登录页
 */
export const requireAuth = (): boolean => {
  const isLoggedIn = checkLogin()
  if (!isLoggedIn) {
    redirectToLogin()
    return false
  }
  return true
}

/**
 * 登录后跳转到目标页面
 */
export const redirectTo = (url: string) => {
  // 尝试多种跳转方式确保成功
  try {
    uni.reLaunch({
      url: url
    })
  } catch (error) {
    console.error('reLaunch failed:', error)
    // 如果reLaunch失败，尝试其他方式
    try {
      uni.redirectTo({
        url: url
      })
    } catch (error2) {
      console.error('redirectTo failed:', error2)
      // 如果都失败，使用navigateTo作为后备
      uni.navigateTo({
        url: url
      })
    }
  }
}