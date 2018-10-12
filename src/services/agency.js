import { stringify } from 'qs';
import request from '@/utils/request';

export async function queryAgency(params) {
  return request(`/api/organization?${stringify(params)}`);
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