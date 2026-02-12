import request from '@/utils/request'

export function getUserList() {
  return request({
    url: '/system/user/list',
    method: 'get'
  })
}

export function getUserById(id) {
  return request({
    url: `/system/user/${id}`,
    method: 'get'
  })
}

export function createUser(data) {
  return request({
    url: '/system/user',
    method: 'post',
    data
  })
}

export function updateUser(data) {
  return request({
    url: '/system/user',
    method: 'put',
    data
  })
}

export function deleteUser(id) {
  return request({
    url: `/system/user/${id}`,
    method: 'delete'
  })
}

export function getUserRoles(userId) {
  return request({
    url: `/system/user/${userId}/roles`,
    method: 'get'
  })
}

export function assignRoles(userId, roleIds) {
  return request({
    url: `/system/user/${userId}/roles`,
    method: 'post',
    data: roleIds
  })
}

export function resetPassword(id) {
  return request({
    url: `/system/user/${id}/reset-password`,
    method: 'post'
  })
}
