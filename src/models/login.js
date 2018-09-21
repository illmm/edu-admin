import { routerRedux } from 'dva/router';
import { stringify } from 'qs';
import { fakeAccountLogin, queryGeetest } from '@/services/api';
import { setAuthority } from '@/utils/authority';
import { getPageQuery } from '@/utils/utils';
import { reloadAuthorized } from '@/utils/Authorized';


export default {
  namespace: 'login',
  state: {
    success: true,
    geetest:{
      gt: "",
      challenge: "",
      success: -1,
    },
  },
  reducers:{
    
  },
  effects: {
    *login({ payload }, { call, put }) {
      const response = yield call(fakeAccountLogin, payload);
      yield put({
        type: 'changeLoginStatus',
        payload: response,
      });
      // Login successfully
      if (response.success) {
        reloadAuthorized();
        const urlParams = new URL(window.location.href);
        const params = getPageQuery();
        let { redirect } = params;
        if (redirect) {
          const redirectUrlParams = new URL(redirect);
          if (redirectUrlParams.origin === urlParams.origin) {
            redirect = redirect.substr(urlParams.origin.length);
            if (redirect.startsWith('/#')) {
              redirect = redirect.substr(2);
            }
          } else {
            window.location.href = redirect;
            return;
          }
        }
        yield put(routerRedux.replace(redirect || '/'));
      }
    },


    *logout(_, { put }) {
      yield put({
        type: 'changeLoginStatus',
        payload: {
          status: false,
          data: {role: 'guest'},
        },
      });
      reloadAuthorized();
      yield put(
        routerRedux.push({
          pathname: '/user/login',
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
    changeLoginStatus(state, { payload }) {
     // const authority = payload.data||{};
      setAuthority(payload.data);
      return {
        ...state,
        success: payload.success,
      };
    },
    saveGeetest(state, { payload }) {
       return {
         ...state,
         geetest: payload,
       };
     },
  },
};
