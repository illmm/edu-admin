import { queryNotices, getQiniuToken, getClassify, getTags } from '@/services/api'
import { queryOrganization,queryRole,queryCurrent,queryOrganizationCode } from '@/services/user'

export default {
  namespace: 'global',

  state: {
    collapsed: false,
    notices: [],
    organization: [],
    role: [],
    currentUser: {},
  
  },

  effects: {
    *getTags(_,{ call, put }){
      const response = yield call(getTags);
      yield put({
        type: 'saveTags',
        payload: response,
      });
    },
    *getClassify({ payload },{ call, put }){
      const response = yield call(getClassify,payload);
      yield put({
        type:'saveClassify',
        payload:response,
      });
      
    },
    *getQiniuToekn({ callback },{ call }){
      const response = yield call(getQiniuToken);
      if(callback) callback(response)
    },
    *fetchNotices(_, { call, put }) {
      const data = yield call(queryNotices);
      yield put({
        type: 'saveNotices',
        payload: data,
      });
      yield put({
        type: 'changeNotifyCount',
        payload: data.length,
      });
    },
    *clearNotices({ payload }, { put, select }) {
      yield put({
        type: 'saveClearedNotices',
        payload,
      });
      const count = yield select(state => state.global.notices.length);
      yield put({
        type: 'changeNotifyCount',
        payload: count,
      });
    },
    *organization(_, { call, put }) {
      yield put({
        type: 'changeLoading',
        payload: true,
      });
      const response = yield call(queryOrganization);
      yield put({
        type: 'saveOrganization',
        payload: response,
      });
      yield put({
        type: 'changeLoading',
        payload: false,
      });
    },
    *organizationCode({payload, callback}, { call }) {
      const response = yield call(queryOrganizationCode,payload);
      if (callback) callback(response);
    },
    *role(_, { call, put }) {
      yield put({
        type: 'changeLoading',
        payload: true,
      });
      const response = yield call(queryRole);
     
      yield put({
        type: 'saveRole',
        payload: response,
      });
      yield put({
        type: 'changeLoading',
        payload: false,
      });
    },
    *fetchCurrent(_, { call, put }) {
      const response = yield call(queryCurrent);
      yield put({
        type: 'saveCurrentUser',
        payload: response,
      });
    },
  },

  reducers: {
    changeLayoutCollapsed(state, { payload }) {
      return {
        ...state,
        collapsed: payload,
      };
    },
    saveNotices(state, { payload }) {
      return {
        ...state,
        notices: payload,
      };
    },
    saveClearedNotices(state, { payload }) {
      return {
        ...state,
        notices: state.notices.filter(item => item.type !== payload),
      };
    },
    saveOrganization(state, action) {
      return {
        ...state,
        organization: action.payload.data,
      };
    },
    saveRole(state, action) {
      return {
        ...state,
        role: action.payload.data,
      };
    },
    saveClassify(state, action) {
      return {
        ...state,
        classify: action.payload,
      };
    },
    saveTags(state, action){
      return {
        ...state,
        tags: action.payload.data,
      };
    },
    changeLoading(state, action) {
      return {
        ...state,
        isLoading: action.payload,
      };
    },
    saveCurrentUser(state, action) {
      return {
        ...state,
        currentUser: action.payload.data || {},
      };
    },
    changeNotifyCount(state, action) {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          notifyCount: action.payload,
        },
      };
    },
  },

  subscriptions: {
    setup({ history }) {
      // Subscribe history(url) change, trigger `load` action if pathname is `/`
      return history.listen(({ pathname, search }) => {
        if (typeof window.ga !== 'undefined') {
          window.ga('send', 'pageview', pathname + search);
        }
      });
    },
  },
};
