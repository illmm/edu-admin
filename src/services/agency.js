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