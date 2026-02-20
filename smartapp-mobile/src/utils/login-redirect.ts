/**
 * 登录跳转管理器 - 专门处理登录后的页面跳转
 * 使用uni-app最佳实践确保跳转成功
 */

/**
 * 登录后跳转到首页
 * 使用多种方法确保跳转成功
 */
export const loginSuccessRedirect = () => {
  console.log('开始登录后跳转流程')
  
  // 方法1: 使用reLaunch（最可靠的方式）
  const method1 = () => {
    console.log('尝试方法1: reLaunch')
    uni.reLaunch({
      url: '/pages/index/index',
      success: () => {
        console.log('方法1成功: reLaunch')
      },
      fail: (error) => {
        console.error('方法1失败:', error)
        method2()
      }
    })
  }
  
  // 方法2: 使用redirectTo
  const method2 = () => {
    console.log('尝试方法2: redirectTo')
    uni.redirectTo({
      url: '/pages/index/index',
      success: () => {
        console.log('方法2成功: redirectTo')
      },
      fail: (error) => {
        console.error('方法2失败:', error)
        method3()
      }
    })
  }
  
  // 方法3: 使用navigateTo
  const method3 = () => {
    console.log('尝试方法3: navigateTo')
    uni.navigateTo({
      url: '/pages/index/index',
      success: () => {
        console.log('方法3成功: navigateTo')
      },
      fail: (error) => {
        console.error('方法3失败:', error)
        method4()
      }
    })
  }
  
  // 方法4: 使用switchTab（如果页面配置为tabBar）
  const method4 = () => {
    console.log('尝试方法4: switchTab')
    uni.switchTab({
      url: '/pages/index/index',
      success: () => {
        console.log('方法4成功: switchTab')
      },
      fail: (error) => {
        console.error('方法4失败:', error)
        finalMethod()
      }
    })
  }
  
  // 最终方法: 显示错误并让用户手动处理
  const finalMethod = () => {
    console.error('所有跳转方法都失败了')
    uni.showModal({
      title: '跳转失败',
      content: '页面跳转失败，请重新启动应用',
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
  
  // 开始执行
  method1()
}

/**
 * 延迟跳转 - 给Toast显示留出时间
 */
export const delayedLoginRedirect = (delay = 300) => {
  console.log(`延迟${delay}ms后跳转`)
  setTimeout(() => {
    loginSuccessRedirect()
  }, delay)
}