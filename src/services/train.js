import request from '@/utils/request';
import { stringify } from 'qs';

export async function queryTrain(params) {
  return request(`/api/train?${stringify(params)}`)
}