import axios from 'axios'
import router from './router'
import {Toast} from 'kiwi-vui/lib/kiwi-vui.min'
let http = axios.create({})

// 请求拦截
http.interceptors.request.use(config => {
  const token = window.localStorage.getItem('zychatToken')
  if (token) {
    config.headers.Authorization = token
  }
  return config
}, error => {
  return Promise.reject(error)
})

// 响应拦截
http.interceptors.response.use(response => {
  return Promise.resolve(response)
}, error => {
  const {status} = error.response
  if (status === 401) {
    console.log('token过期，请重新登录')
    window.localStorage.removeItem('zychatToken')
    router.push('/login')
  } else {
    Toast.open(error.response.data)
  }
  return Promise.reject((error))
})
export default http
