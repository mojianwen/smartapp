/**
 * 页面跳转工具函数 - 专门处理登录后的页面跳转
 */

/**
 * 安全跳转函数 - 尝试多种跳转方式确保成功
 */
export const safeNavigate = (url: string, successCallback?: () => void, failCallback?: () => void) => {
  console.log('开始安全跳转到:', url)
  
  // 方法1: 使用reLaunch
  const tryRelaunch = () => {
    console.log('尝试reLaunch方式...')
    uni.reLaunch({
      url: url,
      success: () => {
        console.log('reLaunch成功')
        successCallback && successCallback()
      },
      fail: (error) => {
        console.error('reLaunch失败:', error)
        // 如果reLaunch失败，尝试其他方法
        tryRedirect()
      }
    })
  }
  
  // 方法2: 使用redirectTo
  const tryRedirect = () => {
    console.log('尝试redirectTo方式...')
    uni.redirectTo({
      url: url,
      success: () => {
        console.log('redirectTo成功')
        successCallback && successCallback()
      },
      fail: (error) => {
        console.error('redirectTo失败:', error)
        // 如果redirectTo失败，尝试其他方法
        tryNavigate()
      }
    })
  }
  
  // 方法3: 使用navigateTo
  const tryNavigate = () => {
    console.log('尝试navigateTo方式...')
    uni.navigateTo({
      url: url,
      success: () => {
        console.log('navigateTo成功')
        successCallback && successCallback()
      },
      fail: (error) => {
        console.error('navigateTo失败:', error)
        // 如果都失败，调用失败回调
        console.error('所有跳转方式都失败了')
        failCallback && failCallback()
      }
    })
  }
  
  // 开始尝试第一种方法
  tryRelaunch()
}

/**
 * 登录后跳转到首页
 */
export const redirectToHome = () => {
  safeNavigate(
    '/pages/index/index',
    () => {
      console.log('成功跳转到首页')
    },
    () => {
      console.error('跳转到首页失败')
      // 最后的备用方案：显示提示并让用户手动跳转
      uni.showModal({
        title: '提示',
        content: '页面跳转失败，请手动刷新页面',
        showCancel: false,
        success: () => {
          // 尝试刷新当前页面
          uni.reLaunch({
            url: '/pages/index/index'
          })
        }
      })
    }
  )
}