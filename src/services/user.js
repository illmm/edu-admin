import { stringify } from 'qs';
import request from '@/utils/request';



export async function queryCurrent() {
  return request('/api/currentUser');
}
export async function queryUser(params) {
  return request(`/api/user?${stringify(params)}`);
}
export async function addUser(params) {
  return request('/api/user', {
    method: 'POST',
    body: {
      ...params
    },
  });
}
export async function removeUser(params) {
  return request('/api/user', {
    method: 'DELETE',
    body: {
      ...params
    },
  });
}

export async function updateUser(params) {
  return request('/api/user', {
    method: 'PUT',
    body: {
      ...params
    },
  });
}
export async function queryOrganization() {
  return request('/api/option/organization');
}
export async function queryOrganizationCode(params) {
  console.log(params);
  return request(`/api/option/organization/code/${params}`);
}
export async function queryRole() {
  return request('/api/option/role');
}

