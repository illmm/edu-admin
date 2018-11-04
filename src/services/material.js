import { stringify } from 'qs'
import request from '@/utils/request'

export async function queryMaterial(params) {
  return request(`/api/textbook?${stringify(params)}`);
}
export async function putaway(params) {
  return request('/api/textbook/putaway',{
    method: 'POST',
    body: {
      ...params
    },
  });
}
export async function soldout(params) {
  return request('/api/textbook/soldout',{
    method: 'POST',
    body: {
      ...params
    },
  });
}