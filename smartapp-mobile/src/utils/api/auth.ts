// auth.ts - 认证相关API

import { post, get, del } from './index'
import { mockLogin, mockGetUserInfo } from '../mockApi'

// 是否使用Mock模式
const USE_MOCK = false

/**
 * 登录接口
 */
export const login = async (data: { username: string; password: string }) => {
  if (USE_MOCK) {
    return await mockLogin(data)
  }
  
  return await post('/auth/login', data)
}

/**
 * 注销接口
 */
export const logout = async () => {
  if (USE_MOCK) {
    return {
      code: 200,
      message: '注销成功',
      data: null
    }
  }
  
  return await del('/auth/logout')
}

/**
 * 获取用户信息
 */
export const getUserInfo = async () => {
  if (USE_MOCK) {
    const token = uni.getStorageSync('token')
    return await mockGetUserInfo(token)
  }
  
  return await get('/auth/userinfo')
}