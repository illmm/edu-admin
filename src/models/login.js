import { routerRedux } from 'dva/router';
import { stringify } from 'qs';
import { fakeAccountLogin, queryGeetest } from '@/services/api';
import { setAuthority, removeAuthority } from '@/utils/authority';
import { getPageQuery } from '@/utils/utils';
import { reloadAuthorized } from '@/utils/Authorized';

export default {
  namespace: 'login',
  state: {
    success: true,
    geetest: {
      gt: '',
      challenge: '',
      success: -1,
    },
  },
  effects: {
    *login({ callback, payload }, { call, put }) {
      const response = yield call(fakeAccountLogin, payload);
      if (callback) callback(response);
      // Login successfully
      if (response.success) {
        setAuthority(response.data);
        reloadAuthorized();
        const urlParams = new URL(window.location.href);
        const params = getPageQuery();
        let { redirect } = params;
        if (redirect) {
          const redirectUrlParams = new URL(redirect);
          if (redirectUrlParams.origin === urlParams.origin) {
            redirect = redirect.substr(urlParams.origin.length);
            if (redirect.match(/^\/.*#/)) {
              redirect = redirect.substr(redirect.indexOf('#') + 1);
            }
          } else {
            window.location.href = redirect;
            return;
          }
        }
        yield put(routerRedux.replace(redirect || '/'));
      }
    },

    *logout(_, { call, put }) {
      removeAuthority();
      reloadAuthorized();
      const response = yield call(queryGeetest);
      yield put({
        type: 'saveGeetest',
        payload: response,
      });
      yield put(
        routerRedux.push({
          pathname: '/login',
          search: stringify({
            redirect: window.location.href,
          }),
        })
      );
    },
    *geetest({ payload }, { call, put }) {
      const response = yield call(queryGeetest, payload);
      yield put({
        type: 'saveGeetest',
        payload: response,
      });
    },
  },
  reducers: {
    saveGeetest(state, { payload }) {
      return {
        ...state,
        geetest: payload,
      };
    },
  },
};
