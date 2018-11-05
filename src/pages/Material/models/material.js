
import { queryMaterial, putaway, soldout,updateMaterial } from '@/services/material';
export default {
  namespace: 'material',
  state: {
    data: {
      list: [],
      pagination: {},
    },
     
  },
  effects: {
    *putaway({ payload, callback },{ call }){
      const response = yield call(putaway,payload);
      if(callback) callback(response);
    },
    *soldout({ payload, callback },{ call }){
      const response = yield call(soldout, payload);
      if(callback) callback(response);
    },
    *fetch({ payload }, { call, put }){
      const response = yield call(queryMaterial,payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *update({ payload, callback },{ call }){
      const response = yield call(updateMaterial,payload);
      if(callback) callback(response);
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