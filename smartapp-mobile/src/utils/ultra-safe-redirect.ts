/**
 * 终极解决方案 - 处理 uni.reLaunch undefined 错误
 * 专门针对 Cannot read properties of undefined (reading 'replace') 错误
 */

/**
 * 检查 uni 环境是否可用
 */
const checkUniEnvironment = (): boolean => {
  try {
    return typeof uni !== 'undefined' && uni !== null
  } catch (error) {
    console.error('检查uni环境失败:', error)
    return false
  }
}

/**
 * 安全的页面跳转
 * 处理所有可能的错误情况
 */
export const ultraSafeRedirect = (url: string) => {
  console.log('执行超安全重定向到:', url)
  
  // 检查uni环境
  if (!checkUniEnvironment()) {
    console.error('uni环境不可用')
    showEnvironmentError()
    return
  }
  
  // 方法1: 使用 try-catch 包裹 reLaunch
  const tryRelaunch = () => {
    console.log('尝试 reLaunch...')
    try {
      uni.reLaunch({
        url: url,
        success: () => {
          console.log('reLaunch 成功')
        },
        fail: (error: any) => {
          console.error('reLaunch fail 回调:', error)
          tryRedirectTo(url)
        },
        complete: () => {
          console.log('reLaunch complete')
        }
      })
    } catch (error) {
      console.error('reLaunch try-catch 异常:', error)
      tryRedirectTo(url)
    }
  }
  
  // 方法2: 使用 redirectTo
  const tryRedirectTo = (url: string) => {
    console.log('尝试 redirectTo...')
    try {
      uni.redirectTo({
        url: url,
        success: () => {
          console.log('redirectTo 成功')
        },
        fail: (error: any) => {
          console.error('redirectTo fail 回调:', error)
          tryNavigateTo(url)
        },
        complete: () => {
          console.log('redirectTo complete')
        }
      })
    } catch (error) {
      console.error('redirectTo try-catch 异常:', error)
      tryNavigateTo(url)
    }
  }
  
  // 方法3: 使用 navigateTo
  const tryNavigateTo = (url: string) => {
    console.log('尝试 navigateTo...')
    try {
      uni.navigateTo({
        url: url,
        success: () => {
          console.log('navigateTo 成功')
        },
        fail: (error: any) => {
          console.error('navigateTo fail 回调:', error)
          showFinalError()
        },
        complete: () => {
          console.log('navigateTo complete')
        }
      })
    } catch (error) {
      console.error('navigateTo try-catch 异常:', error)
      showFinalError()
    }
  }
  
  // 开始执行
  tryRelaunch()
}

/**
 * 显示环境错误
 */
const showEnvironmentError = () => {
  console.error('uni环境不可用，显示错误提示')
  // 尝试使用原生alert
  if (typeof alert !== 'undefined') {
    alert('应用环境错误，请重新启动应用')
  } else {
    console.error('无法显示错误提示，alert也不可用')
  }
}

/**
 * 显示最终错误
 */
const showFinalError = () => {
  console.error('所有跳转方法都失败了')
  
  // 尝试显示modal
  try {
    uni.showModal({
      title: '跳转失败',
      content: '页面跳转失败，请尝试重新启动应用',
      showCancel: false,
      confirmText: '确定',
      success: () => {
        console.log('用户确认了错误提示')
      },
      fail: (error: any) => {
        console.error('显示modal也失败了:', error)
      }
    })
  } catch (error) {
    console.error('显示modal异常:', error)
  }
}

/**
 * 登录后跳转到首页
 */
export const loginRedirectToHome = () => {
  console.log('登录后跳转到首页（终极方案）')
  ultraSafeRedirect('/pages/index/index')
}