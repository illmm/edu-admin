import { stringify } from 'qs'
import request from '@/utils/request'


export async function updateMaterialInfo (params) {
  return request(`/api/textbook/editInfo/${params}`);
}
export async function queryMaterialInfo(params) {
  return request(`/api/textbook/${params}`);
}

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
export async function updateMaterial(params) {
  console.log(params);
  return request('/api/textbook/perfectinfo',{
    method: 'POST',
    body: {
      ...params
    },
  });
}
