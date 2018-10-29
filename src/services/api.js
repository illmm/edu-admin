import { stringify } from 'qs';
import request from '@/utils/request';

/* 用户登录*/
export async function fakeAccountLogin(params) {
  return request(`/api/user/login?${stringify(params)}`, {
    method: 'POST'
  });
}
/* 获取七牛上传token */
export async function getQiniuToken() {
  return request('/api/qiniu/token');
  
}
/* 查询消息*/
export async function queryNotices() {
  return request('/api/notices');
}
export async function queryGeetest() {
  return request('/api/captcha');
}
export async function queryBasicProfile() {
  return request('/api/profile/basic');
}

export async function queryAdvancedProfile() {
  return request('/api/profile/advanced');
}


