import { stringify } from 'qs';
import request from '@/utils/request';



export async function queryCurrent() {
  return request('/api/common/currentUser');
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
  return request('/api/common/getOrganizations');
}

export async function queryRole() {
  return request('/api/common/getRoles');
}

