import request from '@/utils/request'
// import {getToken} from '@/utils/auth'
import Axios from 'axios'
import qs from 'qs'
//{id:1,name:'zhangsan'} 转化为 id=1&name=zhangsan

//全局配置
const myAxios = Axios.create({
  baseURL: 'http://119.45.37.149:8877/',
  timeout: 5000,
});
//携带token
// myAxios.defaults.headers.common['Authorization'] = getToken()

//响应接收前的拦截
myAxios.interceptors.response.use(function(response){
  //将后台的参数结果设置到response(数据封装)
  let {data} = response;
  response.data = data.data;
  response.status = data.status;
  response.statusText = data.message;
  //统一异常处理
  if(data.status !== 200){
    return Promise.reject(data.message);
  }
  return response;
},function(error){
  return Promise.reject(error)
});

export function get (url, params) {
  return myAxios({
    method: 'get',
    url,
    params,
    timeout:10000,
    headers: {
      'X-Requested-With': 'XMLHttpRequest'
    }
  })
}

export function post(url, data){
  return myAxios({
    method: "post",
    url,
    data:qs.stringify(data),
    timeout: 10000,
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
      'Content-Type': 'application/x-www-form-uriencoded;charset=UTF-8'
    }
  })
}

export function login(data) {
  return request({
    url: '/vue-element-admin/user/login',
    method: 'post',
    data
  })
}


export function getInfo(token) {
  return request({
    url: '/vue-element-admin/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/vue-element-admin/user/logout',
    method: 'post'
  })
}
