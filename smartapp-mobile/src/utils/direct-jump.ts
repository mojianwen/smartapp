/**
 * 直接跳转方案 - 绕过所有复杂逻辑
 * 专门处理 Cannot read properties of undefined (reading 'replace') 错误
 */

/**
 * 直接跳转到首页
 * 不使用任何包装函数，直接调用 uni.reLaunch
 */
export const directJumpToHome = () => {
  console.log('直接跳转到首页')
  
  // 延迟执行，确保环境就绪
  setTimeout(() => {
    console.log('执行直接跳转')
    
    // 直接调用，不包装任何额外逻辑
    uni.reLaunch({
      url: '/pages/index/index'
    })
  }, 50) // 极短的延迟
}

/**
 * 使用 Promise 包装跳转
 * 更好地处理异步情况
 */
export const promiseJumpToHome = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    console.log('Promise 跳转到首页')
    
    setTimeout(() => {
      uni.reLaunch({
        url: '/pages/index/index',
        success: () => {
          console.log('Promise 跳转成功')
          resolve()
        },
        fail: (error: any) => {
          console.error('Promise 跳转失败:', error)
          reject(error)
        }
      })
    }, 100)
  })
}

/**
 * 登录后跳转到首页
 * 使用最直接的方法
 */
export const jumpToHomeAfterLogin = () => {
  console.log('登录后跳转到首页（直接方案）')
  directJumpToHome()
}