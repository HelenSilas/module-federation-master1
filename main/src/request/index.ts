import axios, { AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import { ElMessage } from 'element-plus'
import qs from 'qs'

const service = axios.create({
  baseURL: '/api'
})

service.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    return config
  },
  (error: any) => {
    Promise.reject(error)
  }
) // Response interceptors

service.interceptors.response.use(
  async (response: AxiosResponse) => {
    if (response.data.code === 302) {
      location.href = `${window.location.origin}/login`
    }

    if (response.data.code !== 200) {
      ElMessage({
        message: response.data.errorMsg || response.data.msg,
        type: 'error',
        customClass: 'global-message'
      })
      throw new Error('接口错误')
    }

    return response
  },
  (error: any) => {
    ElMessage({
      message: error.message,
      type: 'error',
      customClass: 'global-message'
    })
    return Promise.reject(error)
  }
)

function get (url: string, params?: object, config?: object): any {
  return new Promise((resolve, reject) => {
    service
      .get(url, {
        params,
        ...config,
        paramsSerializer: {
          serialize: (params) => qs.stringify(params, { arrayFormat: 'repeat' })
        }
      })
      .then((res) => {
        resolve(res.data.data)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

function post (url: string, data?: object, config?: object): any {
  return new Promise((resolve, reject) => {
    service
      .post(url, data, config)
      .then((res) => {
        resolve(res.data.data)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

function postForm (url: string, data?: object, config?: object): any {
  return new Promise((resolve, reject) => {
    service
      .post(url, qs.stringify(data), config)
      .then((res) => {
        resolve(res.data.data)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

function put (url: string, data?: object, config?: object): any {
  return new Promise((resolve, reject) => {
    service
      .put(url, data, config)
      .then((res) => {
        resolve(res.data.data)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

function putForm (url: string, data?: object, config?: object): any {
  return new Promise((resolve, reject) => {
    service
      .put(url, qs.stringify(data), config)
      .then((res) => {
        resolve(res.data.data)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

function remove (url: string, params?: object, config?: object): any {
  return new Promise((resolve, reject) => {
    service
      .delete(url, {
        params,
        ...config
      })
      .then((res) => {
        resolve(res.data.data)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

const request = { get, post, postForm, put, putForm, delete: remove }

window.request = request

export default request
