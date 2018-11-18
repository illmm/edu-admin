import { stringify } from 'qs';
import request from '@/utils/request';

/**
 * @method 在线课程列表
 * @param {*} params 
 */
export async function queryOnlineCourse(params) {
  return request(`/api/course/online?${stringify(params)}`)
}
/**
 * @method 视频课程列表
 * @param {*} params 
 */
export async function queryVideoCourse(params) {
  return request(`/api/course/video?${stringify(params)}`)
}
/**
 * @method 视频课程列表
 * @param {*} params 
 */
export async function addCourse(params) {
  return request(`/api/course`,{
    body: params,
    method: 'POST',
  })
}

export async function queryBBCourse(params) {
  return request(`/api/course/noAddOnline/${params}`)
}