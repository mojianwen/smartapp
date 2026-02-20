// menu.ts - 菜单相关API

import { get } from './index'

/**
 * 获取用户菜单树
 */
export const getUserMenuTree = async () => {
  return await get('/auth/info')
}

/**
 * 获取所有菜单
 */
export const getAllMenus = async () => {
  return await get('/menu/list')
}