// api.ts - 通用API工具函数

// 从环境变量获取API基础URL，如果没有配置则使用默认值
const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api'

interface ApiResponse<T = any> {
  code: number
  message: string
  data?: T
}

/**
 * 通用请求方法
 */
export const request = async <T = any>(options: UniApp.RequestOptions): Promise<ApiResponse<T>> => {
  const token = uni.getStorageSync('token')
  
  // 设置默认请求头
  const requestOptions: UniApp.RequestOptions = {
    ...options,
    header: {
      'Content-Type': 'application/json',
      'Authorization': token ? `Bearer ${token}` : '',
      ...options.header
    }
  }
  
  try {
    const response = await uni.request(requestOptions)
    return response.data as ApiResponse<T>
  } catch (error: any) {
    console.error('API请求失败:', error)
    // 返回一个模拟的错误对象
    throw {
      code: 500,
      message: error.errMsg || '网络错误或服务器异常'
    }
  }
}

/**
 * GET 请求
 */
export const get = <T = any>(url: string, params?: any) => {
  return request<T>({
    url: `${BASE_URL}${url}`,
    method: 'GET',
    data: params
  })
}

/**
 * POST 请求
 */
export const post = <T = any>(url: string, data?: any) => {
  return request<T>({
    url: `${BASE_URL}${url}`,
    method: 'POST',
    data
  })
}

/**
 * PUT 请求
 */
export const put = <T = any>(url: string, data?: any) => {
  return request<T>({
    url: `${BASE_URL}${url}`,
    method: 'PUT',
    data
  })
}

/**
 * DELETE 请求
 */
export const del = <T = any>(url: string) => {
  return request<T>({
    url: `${BASE_URL}${url}`,
    method: 'DELETE'
  })
}