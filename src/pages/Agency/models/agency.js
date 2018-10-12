
import { queryAgency,addAgency,removeAgency,updateAgency } from '@/services/agency';
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
    },
    *add({ payload,callback }, { call }){
      const vals = {
        name:payload.name,
        code:payload.code,
        logo:payload.logo.file.response.key,
        studentNum:payload.studentNum,
        teacherNum:payload.teacherNum,
        salesman:payload.salesman,
        startDate:payload.date[0],
        endDate:payload.date[1],
        description:payload.description,
      }
      const response = yield call(addAgency,vals);
      if (callback) callback(response);
    },
    *remove({ payload, callback }, { call }) {
      const response = yield call(removeAgency, payload);
      if (callback) callback(response);
    },
    *update({ payload, callback }, { call }) {
      const response = yield call(updateAgency, payload);
      if (callback) callback(response);
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