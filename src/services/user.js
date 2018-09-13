import { stringify } from 'qs';
import request from '@/utils/request';



export async function queryCurrent() {
  return request('http://192.168.1.145:8999/api/common/currentUser');
}
export async function queryUser(params) {
  console.log(stringify(params));
  return request(`http://192.168.1.145:8999/api/user?${stringify(params)}`);
}
export async function addUser(params) {
  return request('http://192.168.1.145:8999/api/user', {
    method: 'POST',
    body: {
      ...params
    },
  });
}
export async function removeUser(params) {
  return request('http://192.168.1.145:8999/api/user', {
    method: 'DELETE',
    body: {
      ...params
    },
  });
}

export async function updateUser(params) {
  return request('http://192.168.1.145:8999/api/user', {
    method: 'PUT',
    body: {
      ...params
    },
  });
}
export async function queryOrganization() {
  return request('http://192.168.1.145:8999/api/common/getOrganizations');
}

export async function queryRole() {
  return request('http://192.168.1.145:8999/api/common/getRoles');
}

