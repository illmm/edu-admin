import { stringify } from 'qs';
import request from '@/utils/request';

/* 用户登录*/
export async function fakeAccountLogin(params) {
  return request(`/api/user/login?${stringify(params)}`, {
    method: 'POST'
  });
}
/* 查询消息*/
export async function queryNotices() {
  return request('/api/notices');
}
export async function queryGeetest() {
  return request('/api/captcha');
}


