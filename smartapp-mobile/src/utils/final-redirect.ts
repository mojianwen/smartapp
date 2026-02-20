/**
 * 最终解决方案 - 登录跳转
 * 使用最可靠的方法确保跳转成功
 */

/**
 * 最简单的跳转方法
 * 直接使用uni.reLaunch，避免复杂逻辑
 */
export const simpleRedirectToHome = () => {
  console.log('执行最简单的首页跳转')
  
  // 延迟一点时间给Toast显示
  setTimeout(() => {
    console.log('开始reLaunch跳转到首页')
    
    // 直接使用reLaunch，这是最可靠的方式
    uni.reLaunch({
      url: '/pages/index/index',
      success: () => {
        console.log('跳转成功！')
      },
      fail: (error) => {
        console.error('跳转失败:', error)
        // 如果失败，显示错误信息
        uni.showModal({
          title: '跳转失败',
          content: '页面跳转失败，错误信息：' + JSON.stringify(error),
          showCancel: false,
          confirmText: '确定'
        })
      },
      complete: () => {
        console.log('跳转完成')
      }
    })
  }, 200) // 很短的延迟
}

/**
 * 立即跳转 - 无延迟
 */
export const immediateRedirectToHome = () => {
  console.log('立即执行首页跳转')
  
  uni.reLaunch({
    url: '/pages/index/index',
    success: () => {
      console.log('立即跳转成功！')
    },
    fail: (error) => {
      console.error('立即跳转失败:', error)
      // 备用方案：显示错误并尝试重新跳转
      setTimeout(() => {
        uni.reLaunch({
          url: '/pages/index/index'
        })
      }, 1000)
    }
  })
}