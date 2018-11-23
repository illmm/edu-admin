import request from '@/utils/request';
import { stringify } from 'qs';


/**
 * @method 培训列表
 * @param {*} params 
 */
export async function queryTrain(params) {
  return request(`/api/train?${stringify(params)}`);
}

/**
 * @method 添加培训
 * @param {*} params 
 */
export async function addTrain(params) {
  return request('/api/train/',{
    method:'POST',
    body:params,
  });
}