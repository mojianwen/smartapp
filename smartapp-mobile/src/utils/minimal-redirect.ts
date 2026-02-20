/**
 * 极简修复方案 - 处理 Cannot read properties of undefined (reading 'replace') 错误
 */

/**
 * 最简单的跳转方法 - 直接调用
 */
export const minimalRedirect = (url: string) => {
  console.log('执行极简重定向到:', url)
  
  // 延迟执行，避免立即调用
  setTimeout(() => {
    console.log('开始执行跳转...')
    
    try {
      // 检查 uni 对象是否存在
      if (typeof uni === 'undefined') {
        console.error('uni 对象未定义')
        return
      }
      
      // 检查 reLaunch 方法是否存在
      if (typeof uni.reLaunch === 'undefined') {
        console.error('uni.reLaunch 方法未定义')
        return
      }
      
      // 执行跳转
      uni.reLaunch({
        url: url,
        success: () => {
          console.log('跳转成功！')
        },
        fail: (error: any) => {
          console.error('跳转失败:', error)
          // 如果失败，尝试其他方法
          tryAlternativeMethods(url)
        }
      })
    } catch (error) {
      console.error('跳转抛出异常:', error)
      tryAlternativeMethods(url)
    }
  }, 100) // 很短的延迟
}

/**
 * 尝试其他跳转方法
 */
const tryAlternativeMethods = (url: string) => {
  console.log('尝试备用跳转方法...')
  
  // 方法1: 使用 redirectTo
  try {
    uni.redirectTo({
      url: url,
      success: () => {
        console.log('redirectTo 成功')
      },
      fail: (error: any) => {
        console.error('redirectTo 失败:', error)
        // 方法2: 使用 navigateTo
        uni.navigateTo({
          url: url,
          success: () => {
            console.log('navigateTo 成功')
          },
          fail: (error: any) => {
            console.error('navigateTo 失败:', error)
            showError()
          }
        })
      }
    })
  } catch (error) {
    console.error('备用方法异常:', error)
    showError()
  }
}

/**
 * 显示错误
 */
const showError = () => {
  console.error('所有跳转方法都失败了')
  
  // 尝试显示错误提示
  try {
    uni.showToast({
      title: '跳转失败',
      icon: 'none',
      duration: 2000
    })
  } catch (error) {
    console.error('显示错误提示也失败了:', error)
  }
}

/**
 * 登录后跳转到首页
 */
export const loginToHome = () => {
  console.log('登录后跳转到首页（极简方案）')
  minimalRedirect('/pages/index/index')
}