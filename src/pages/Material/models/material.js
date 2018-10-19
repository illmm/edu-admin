
import { queryMaterial } from '@/services/material';
export default {
  namespace: 'material',
  state: {
    data: {
      list: [],
      pagination: {},
    },
     
  },
  effects: {
    *fetch({ payload }, { call, put }){
      const response = yield call(queryMaterial,payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },
  },
  reducers: {
    save(state, action){
      return {
        ...state,
        data:action.payload.data,
      };
    },
  },

};