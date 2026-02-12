import request from '@/utils/request'

export function getRoleList() {
  return request({
    url: '/system/role/list',
    method: 'get'
  })
}

export function getRoleById(id) {
  return request({
    url: `/system/role/${id}`,
    method: 'get'
  })
}

export function createRole(data) {
  return request({
    url: '/system/role',
    method: 'post',
    data
  })
}

export function updateRole(data) {
  return request({
    url: '/system/role',
    method: 'put',
    data
  })
}

export function deleteRole(id) {
  return request({
    url: `/system/role/${id}`,
    method: 'delete'
  })
}

export function assignMenus(roleId, menuIds) {
  return request({
    url: `/system/role/${roleId}/menus`,
    method: 'post',
    data: menuIds
  })
}

export function getRoleMenus(roleId) {
  return request({
    url: `/system/role/${roleId}/menus`,
    method: 'get'
  })
}
