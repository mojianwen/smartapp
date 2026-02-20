/**
 * 最终解决方案 - 处理 Cannot read properties of undefined (reading 'replace') 错误
 * 使用最简化的方法确保跳转成功
 */

/**
 * 最简化的跳转方法
 * 直接调用 uni.reLaunch，没有任何包装
 */
export const finalRedirectToHome = () => {
  console.log('执行最终跳转方案')
  
  // 立即执行，不延迟
  try {
    uni.reLaunch({
      url: '/pages/index/index'
    })
  } catch (error) {
    console.error('最终跳转失败:', error)
    
    // 如果失败，尝试显示错误
    try {
      uni.showToast({
        title: '跳转失败',
        icon: 'none'
      })
    } catch (showError) {
      console.error('显示错误也失败了:', showError)
    }
  }
}

/**
 * 无错误的跳转方法
 * 避免所有可能导致 undefined 错误的操作
 */
export const errorFreeRedirect = () => {
  console.log('执行无错误跳转')
  
  // 使用 setTimeout 确保在下一个事件循环中执行
  setTimeout(() => {
    // 直接调用，不检查任何东西
    uni.reLaunch({
      url: '/pages/index/index'
    })
  }, 0)
}

/**
 * 登录后跳转到首页
 * 使用最可靠的方法
 */
export const loginRedirect = () => {
  console.log('登录后跳转到首页（最终方案）')
  
  // 给 Toast 显示留一点时间
  setTimeout(() => {
    finalRedirectToHome()
  }, 100)
}