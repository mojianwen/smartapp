/**
 * 页面跳转管理器 - 处理uni-app中的页面跳转问题
 */

/**
 * 页面跳转配置
 */
interface NavigateOptions {
  url: string
  type?: 'navigate' | 'redirect' | 'reLaunch' | 'switchTab'
  delay?: number
  success?: () => void
  fail?: (error: any) => void
}

/**
 * 智能页面跳转
 * 自动选择最佳的跳转方式
 */
export const smartNavigate = (options: NavigateOptions) => {
  const { url, type = 'reLaunch', delay = 0, success, fail } = options
  
  console.log(`智能跳转开始: ${url}, 类型: ${type}, 延迟: ${delay}ms`)
  
  const doNavigate = () => {
    switch (type) {
      case 'navigate':
        uni.navigateTo({
          url,
          success: () => {
            console.log(`navigateTo成功: ${url}`)
            success && success()
          },
          fail: (error) => {
            console.error(`navigateTo失败: ${url}`, error)
            // 如果失败，尝试其他方式
            smartNavigate({ ...options, type: 'redirect' })
          }
        })
        break
        
      case 'redirect':
        uni.redirectTo({
          url,
          success: () => {
            console.log(`redirectTo成功: ${url}`)
            success && success()
          },
          fail: (error) => {
            console.error(`redirectTo失败: ${url}`, error)
            // 如果失败，尝试其他方式
            smartNavigate({ ...options, type: 'reLaunch' })
          }
        })
        break
        
      case 'reLaunch':
        uni.reLaunch({
          url,
          success: () => {
            console.log(`reLaunch成功: ${url}`)
            success && success()
          },
          fail: (error) => {
            console.error(`reLaunch失败: ${url}`, error)
            // 如果失败，尝试最后的方式
            smartNavigate({ ...options, type: 'switchTab' })
          }
        })
        break
        
      case 'switchTab':
        uni.switchTab({
          url,
          success: () => {
            console.log(`switchTab成功: ${url}`)
            success && success()
          },
          fail: (error) => {
            console.error(`switchTab失败: ${url}`, error)
            // 所有方法都失败
            fail && fail(error)
          }
        })
        break
    }
  }
  
  if (delay > 0) {
    setTimeout(doNavigate, delay)
  } else {
    doNavigate()
  }
}

/**
 * 登录后跳转到首页
 */
export const navigateToHome = () => {
  console.log('开始跳转到首页')
  
  smartNavigate({
    url: '/pages/index/index',
    type: 'reLaunch',
    delay: 300, // 给Toast显示留出时间
    success: () => {
      console.log('成功跳转到首页')
    },
    fail: (error) => {
      console.error('跳转到首页失败:', error)
      // 最后的备用方案
      uni.showModal({
        title: '跳转失败',
        content: '页面跳转失败，请重新打开应用',
        showCancel: false,
        confirmText: '确定',
        success: () => {
          // 尝试重启应用
          uni.reLaunch({
            url: '/pages/index/index'
          })
        }
      })
    }
  })
}