// login-success.ts - 登录成功后跳转处理

/**
 * 登录成功后的跳转处理
 * 使用多种方法确保跳转成功
 */
export const handleLoginSuccess = () => {
  console.log('登录成功，开始跳转流程')
  
  // 方法1: 使用reLaunch
  const jumpToHome = () => {
    console.log('使用reLaunch跳转到首页')
    uni.reLaunch({
      url: '/pages/index/index',
      success: () => {
        console.log('reLaunch跳转成功')
      },
      fail: (error) => {
        console.error('reLaunch跳转失败:', error)
        // 如果reLaunch失败，尝试其他方法
        jumpToHome2()
      }
    })
  }
  
  // 方法2: 使用redirectTo
  const jumpToHome2 = () => {
    console.log('使用redirectTo跳转到首页')
    uni.redirectTo({
      url: '/pages/index/index',
      success: () => {
        console.log('redirectTo跳转成功')
      },
      fail: (error) => {
        console.error('redirectTo跳转失败:', error)
        // 如果redirectTo失败，尝试最后的方法
        jumpToHome3()
      }
    })
  }
  
  // 方法3: 使用navigateTo
  const jumpToHome3 = () => {
    console.log('使用navigateTo跳转到首页')
    uni.navigateTo({
      url: '/pages/index/index',
      success: () => {
        console.log('navigateTo跳转成功')
      },
      fail: (error) => {
        console.error('navigateTo跳转失败:', error)
        // 所有方法都失败，显示错误提示
        showJumpError()
      }
    })
  }
  
  // 显示跳转失败错误
  const showJumpError = () => {
    console.error('所有跳转方法都失败了')
    uni.showModal({
      title: '跳转失败',
      content: '页面跳转失败，请手动刷新应用',
      showCancel: false,
      success: () => {
        // 尝试最后的方法：重新启动应用
        uni.reLaunch({
          url: '/pages/index/index'
        })
      }
    })
  }
  
  // 开始执行跳转
  jumpToHome()
}