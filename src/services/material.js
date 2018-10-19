import { stringify } from 'qs';
import request from '@/utils/request';
export async function queryMaterial(params) {
  return request(`/api/textbook?${stringify(params)}`);
}