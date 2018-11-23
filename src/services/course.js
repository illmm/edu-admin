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
 * @method 添加课程
 * @param {*} params 
 */
export async function addCourse(params) {
  return request(`/api/course/add`,{
    body: params,
    method: 'POST',
  })
}
/**
 * @method 获取BB课程列表
 * @param {*} params 
 */
export async function queryBBCourse(params) {
  return request(`/api/course/noAddOnline/${params}`)
}

/**
 * @method 获取课程详细
 * @param {*} params 
 */
export async function queryCourseInfo(params) {
  return request(`/api/course/noAddOnline/${params}`)
}

/**
 * @method 更新课程
 * @param {*} params 
 */
export async function updateCourse(params) {
  return request(`/api/course/update`,{
    body: params,
    method: 'POST',
  })
}

export async function updateCourseStatus(params) {
  return request(`/api/course/updateStatus`,{
    body: params,
    method: 'POST',
  })
}