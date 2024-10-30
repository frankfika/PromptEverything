import axios, { AxiosError } from 'axios'

export const request = axios.create({
  baseURL: 'http://127.0.0.1:8000',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
})

request.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response) {
      // 服务器返回了错误响应
      console.error('API Response Error:', {
        status: error.response.status,
        statusText: error.response.statusText,
        data: error.response.data,
        url: error.config?.url
      })
    } else if (error.request) {
      // 请求已发出，但没有收到响应
      console.error('API Request Error:', {
        message: 'No response received',
        url: error.config?.url
      })
    } else {
      // 请求配置时出错
      console.error('API Config Error:', {
        message: error.message,
        url: error.config?.url
      })
    }
    return Promise.reject(error)
  }
) 