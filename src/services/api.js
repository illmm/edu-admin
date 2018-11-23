import { stringify } from 'qs';
import request from '@/utils/request';

/**
 * @method 用户登录
 * @param {*} params 
 */
export async function fakeAccountLogin(params) {
  return request(`/api/user/login?${stringify(params)}`, {
    method: 'POST',
  });
}

/**
 * @method 获取七牛上传token
 */
export async function getQiniuToken() {
  return request('/api/qiniu/token');
}

/**
 * @method 来源自动完成
 * @param {*} params 
 */
export async function queryAutoSource(params) {
  return request(`/api/option/source/name?${stringify(params)}`);
}

/**
 * @method 获取分类
 * @param {*} params 
 */
export async function getClassify(params) {
  return request(`/api/front/common/classification?blank=1&${stringify(params)}`);
}

/**
 * @method 获取标签
 */
export async function getTags() {
  return request('/api/front/common/tags');
}

/**
 * @method 获取来源
 */
export async function querySource() {
  return request('/api/front/common/source');
}

/**
 * @method 查询消息
 */
export async function queryNotices() {
  return request('/api/notices');
}

/**
 * @method 验证码
 */
export async function queryGeetest() {
  return request('/api/captcha');
}
