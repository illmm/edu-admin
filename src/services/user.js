import { stringify } from 'qs';
import request from '@/utils/request';
/**
 * @method 当前登录用户信息
 */
export async function queryCurrent() {
  return request('/api/currentUser');
}
/**
 * @method 查询用户列表
 * @param {*} params 
 */
export async function queryUser(params) {
  return request(`/api/user?${stringify(params)}`);
}

/**
 * @method 新增用户
 * @param {*} params 
 */
export async function addUser(params) {
  return request('/api/user', {
    method: 'POST',
    body: {
      ...params
    },
  });
}
/**
 * @method 删除用户
 * @param {*} params 
 */
export async function removeUser(params) {
  return request('/api/user', {
    method: 'DELETE',
    body: {
      ...params
    },
  });
}
/**
 * @method 更新用户
 * @param {*} params 
 */
export async function updateUser(params) {
  return request('/api/user', {
    method: 'PUT',
    body: {
      ...params,
    },
  });
}
/**
 * @method 修改当前用户密码
 */
export async function modifyPwd(params) {
  return request('/api/user/updatePassword',{
    method: 'POST',
    body: {
      ...params,
    }
  })
}

/**
 * @method 机构下拉列表数据
 */
export async function queryOrganization() {
  return request('/api/option/organization');
}
/**
 * @method 通过机构ID获取机构编号
 * @param {*} params 
 */
export async function queryOrganizationCode(params) {
  return request(`/api/option/organization/code/${params}`);
}
/**
 * @method 角色下拉列表数据
 */
export async function queryRole() {
  return request('/api/option/role');
}

