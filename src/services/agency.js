import { stringify } from 'qs';
import request from '@/utils/request';

export async function queryAgency(params) {
  return request(`/api/organization?${stringify(params)}`);
}
export async function queryAgencyInfo(params) {
  return request(`/api/organization/${params}`);
}
export async function addAgency(params) {
  return request('/api/organization', {
    method: 'POST',
    body: {
      ...params
    },
  });
}
export async function removeAgency(params) {
  return request('/api/organization', {
    method: 'DELETE',
    body: {
      ...params
    },
  });
}
export async function updateAgency(params) {
  return request('/api/organization', {
    method: 'PUT',
    body: {
      ...params
    },
  });
}
/* 分配页面资源查询 包含已分配 未分配 */
export async function resourceSearch(params) {
  return request(`/api/distribution?${stringify(params)}`)
}
export async function resourceDistribution(params) {
  return request('/api/distribution/move',{
    method: 'POST',
    body: {
      ...params
    }
  })
}