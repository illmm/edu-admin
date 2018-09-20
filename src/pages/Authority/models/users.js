import { queryUser, removeUser, addUser, updateUser } from '@/services/user';

export default {
  namespace: 'users',

  state: {
    data: {
      list: [],
      pagination: {},
    },
    
  },
  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryUser, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *add({ payload, callback }, { call }) {
      const response = yield call(addUser, payload);
      if (callback) callback(response);
    },
    *remove({ payload, callback }, { call }) {
      const response = yield call(removeUser, payload);
      if (callback) callback(response);
    },
    *update({ payload, callback }, { call }) {
      const response = yield call(updateUser, payload);
      if (callback) callback(response);
    },
    
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        data: action.payload.data,
      };
    },
    
  },
};
