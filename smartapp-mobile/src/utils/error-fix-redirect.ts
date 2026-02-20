/**
 * 错误修复跳转器 - 专门处理 uni.reLaunch 的 undefined 错误
 */

/**
 * 安全的页面跳转
 * 处理 uni.reLaunch 的 undefined 错误
 */
export const safeRedirect = (url: string) => {
  console.log('执行安全重定向到:', url)
  
  try {
    // 方法1: 尝试使用 uni.reLaunch
    if (typeof uni !== 'undefined' && uni.reLaunch) {
      console.log('尝试 uni.reLaunch...')
      uni.reLaunch({
        url: url,
        success: () => {
          console.log('uni.reLaunch 成功')
        },
        fail: (error: any) => {
          console.error('uni.reLaunch 失败:', error)
          // 如果失败，尝试其他方法
          tryRedirectTo(url)
        }
      })
    } else {
      console.warn('uni 对象或 reLaunch 方法未定义')
      tryRedirectTo(url)
    }
  } catch (error) {
    console.error('uni.reLaunch 抛出异常:', error)
    tryRedirectTo(url)
  }
}

/**
 * 备用跳转方法
 */
const tryRedirectTo = (url: string) => {
  try {
    console.log('尝试 uni.redirectTo...')
    uni.redirectTo({
      url: url,
      success: () => {
        console.log('uni.redirectTo 成功')
      },
      fail: (error: any) => {
        console.error('uni.redirectTo 失败:', error)
        tryNavigateTo(url)
      }
    })
  } catch (error) {
    console.error('uni.redirectTo 抛出异常:', error)
    tryNavigateTo(url)
  }
}

/**
 * 最后的备用方法
 */
const tryNavigateTo = (url: string) => {
  try {
    console.log('尝试 uni.navigateTo...')
    uni.navigateTo({
      url: url,
      success: () => {
        console.log('uni.navigateTo 成功')
      },
      fail: (error: any) => {
        console.error('uni.navigateTo 失败:', error)
        showErrorAndManualRedirect(url)
      }
    })
  } catch (error) {
    console.error('uni.navigateTo 抛出异常:', error)
    showErrorAndManualRedirect(url)
  }
}

/**
 * 显示错误并提供手动跳转方案
 */
const showErrorAndManualRedirect = (url: string) => {
  console.error('所有自动跳转方法都失败了')
  
  uni.showModal({
    title: '跳转失败',
    content: '页面跳转失败，请手动点击确定按钮跳转',
    showCancel: false,
    confirmText: '立即跳转',
    success: (res) => {
      if (res.confirm) {
        // 用户点击确定，再次尝试跳转
        console.log('用户选择手动跳转')
        
        // 延迟一点再试，避免立即重试
        setTimeout(() => {
          try {
            uni.reLaunch({
              url: url,
              success: () => {
                console.log('手动重试跳转成功')
              },
              fail: (error: any) => {
                console.error('手动重试仍然失败:', error)
                showFinalError()
              }
            })
          } catch (error) {
            console.error('手动重试抛出异常:', error)
            showFinalError()
          }
        }, 500)
      }
    }
  })
}

/**
 * 显示最终错误信息
 */
const showFinalError = () => {
  uni.showModal({
    title: '跳转失败',
    content: '页面跳转失败，请重新启动应用',
    showCancel: false,
    confirmText: '确定'
  })
}

/**
 * 登录后跳转到首页
 */
export const redirectToHomeAfterLogin = () => {
  console.log('登录后跳转到首页')
  safeRedirect('/pages/index/index')
}