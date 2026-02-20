/**
 * Mock API 模块 - 用于在没有后端服务时模拟API响应
 */

// 模拟用户数据
const mockUsers = [
  {
    id: 1,
    username: 'admin',
    password: 'admin123', // 实际应用中不应该明文存储
    nickname: '系统管理员',
    avatar: '/static/avatar/default.jpg',
    roles: ['admin'],
    permissions: ['*:*:*']
  },
  {
    id: 2,
    username: 'user',
    password: 'user123',
    nickname: '普通用户',
    avatar: '/static/avatar/default.jpg',
    roles: ['user'],
    permissions: ['system:user:list', 'system:user:query']
  }
]

/**
 * 模拟登录API
 */
export const mockLogin = (credentials: { username: string; password: string }) => {
  return new Promise((resolve, reject) => {
    // 模拟网络延迟
    setTimeout(() => {
      const user = mockUsers.find(u => 
        u.username === credentials.username && 
        u.password === credentials.password
      )
      
      if (user) {
        // 生成模拟token
        const token = `mock_token_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
        
        resolve({
          code: 200,
          message: '登录成功',
          data: {
            token: token,
            userInfo: {
              id: user.id,
              username: user.username,
              nickname: user.nickname,
              avatar: user.avatar,
              roles: user.roles,
              permissions: user.permissions
            }
          }
        })
      } else {
        reject({
          code: 401,
          message: '用户名或密码错误'
        })
      }
    }, 800) // 模拟网络延迟
  })
}

/**
 * 模拟获取用户信息API
 */
export const mockGetUserInfo = (token: string) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (token && token.startsWith('mock_token_')) {
        const userId = parseInt(token.split('_')[2]) || 1
        const user = mockUsers.find(u => u.id === userId) || mockUsers[0]
        
        resolve({
          code: 200,
          message: '获取成功',
          data: {
            user: {
              id: user.id,
              username: user.username,
              nickname: user.nickname,
              avatar: user.avatar,
              roles: user.roles,
              permissions: user.permissions
            },
            menus: [
              { id: 1, name: '首页', path: '/pages/index/index', icon: 'home' },
              { id: 2, name: '工作台', path: '/pages/workspace/index', icon: 'grid' },
              { id: 3, name: '消息', path: '/pages/message/index', icon: 'email' },
              { id: 4, name: '我的', path: '/pages/profile/index', icon: 'person' }
            ]
          }
        })
      } else {
        reject({
          code: 401,
          message: '无效的token'
        })
      }
    }, 300)
  })
}