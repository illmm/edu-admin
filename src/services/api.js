import { stringify } from 'qs';
import request from '@/utils/request';

/* 用户登录 */
export async function fakeAccountLogin(params) {
  return request(`/api/user/login?${stringify(params)}`, {
    method: 'POST',
  });
}
/* 获取七牛上传token */
export async function getQiniuToken() {
  return request('/api/qiniu/token');
}
/* 来源自动完成 */
export async function queryAutoSource(params) {
  return request(`/api/option/source/name?${stringify(params)}`);
}
/* 获取分类 */
export async function getClassify(params) {
  return request(`/api/front/common/classification?${stringify(params)}`);
}

/* 获取标签 */
export async function getTags() {
  return request('/api/front/common/tags');
}

/* 获取来源 */
export async function querySource() {
  return request('/api/front/common/source');
}

/* 查询消息 */
export async function queryNotices() {
  return request('/api/notices');
}
/* 验证码 */
export async function queryGeetest() {
  return request('/api/captcha');
}
