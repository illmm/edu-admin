
import { queryAgency } from '@/services/agency';
export default {
  namespace: 'agency',
  state: {
    data: {
      list: [],
      pagination: {},
    },  
  },
  effects: {
    *fetch({ payload }, { call, put }){
      const response = yield call(queryAgency,payload);
     
      yield put({
        type: 'save',
        payload: response,
      });
    }
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