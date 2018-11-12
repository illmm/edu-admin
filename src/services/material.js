import { stringify } from 'qs'
import request from '@/utils/request'
/**
 * @method 查询编辑教材页详情信息
 * @param {*} params 
 */
export async function updateMaterialInfo (params) {
  return request(`/api/textbook/editInfo/${params}`);
}

/**
 * @method 教材详细页面信息
 * @param {*} params 
 */
export async function queryMaterialInfo(params) {
  return request(`/api/textbook/${params}`);
}
/**
 * @method 教材列表
 * @param {*} params 
 */
export async function queryMaterial(params) {
  return request(`/api/textbook?${stringify(params)}`);
}
/**
 * @method 教材批量上架
 * @param {Array} params 
 */
export async function putaway(params) {
  return request('/api/textbook/putaway',{
    method: 'POST',
    body: {
      ...params
    },
  });
}
/**
 * @method 教材批量下架
 * @param {Array} params 
 */
export async function soldout(params) {
  return request('/api/textbook/soldout',{
    method: 'POST',
    body: {
      ...params
    },
  });
}
/**
 * @method 更新教材
 * @param {Object} params 
 */
export async function updateMaterial(params) {
  return request('/api/textbook/perfectinfo',{
    method: 'POST',
    body: {
      ...params
    },
  });
}
