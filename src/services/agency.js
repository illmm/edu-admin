import { stringify } from 'qs';
import request from '@/utils/request';
/**
 * @method 查询机构
 * @param {Object} params 
 */
export async function queryAgency(params) {
  return request(`/api/organization?${stringify(params)}`);
}
/**
 * @method 机构详细
 * @param {String} params 
 */
export async function queryAgencyInfo(params) {
  return request(`/api/organization/${params}`);
}
/**
 * @method 新增机构
 * @param {Object} params 
 */
export async function addAgency(params) {
  return request('/api/organization', {
    method: 'POST',
    body: {
      ...params
    },
  });
}
/**
 * @method 删除机构
 * @param {String} params 
 */
export async function removeAgency(params) {
  return request('/api/organization', {
    method: 'DELETE',
    body: {
      ...params
    },
  });
}
/**
 * @method 更新机构
 * @param {Object} params 
 */
export async function updateAgency(params) {
  return request('/api/organization', {
    method: 'PUT',
    body: {
      ...params
    },
  });
}
/**
 * @method 分配页面资源查询 
 * @param {Object} params 
 */
export async function resourceSearch(params) {
  return request(`/api/distribution?${stringify(params)}`)
}
/**
 * @method 分配、移除操作
 * @param {Object} params 
 */
export async function resourceDistribution(params) {
  return request('/api/distribution/move',{
    method: 'POST',
    body: {
      ...params
    }
  })
}
/**
 * @method 查询该机构下所有已购资源
 * @param {*} params 
 */
export async function purchased(params) {
  return request(`/api/distribution/purchased/${params}`)
}