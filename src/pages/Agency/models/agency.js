
import { 
  queryAgency,
  addAgency,
  removeAgency,
  updateAgency,
  queryAgencyInfo,
  resourceSearch,
  resourceDistribution,
} from '@/services/agency';
export default {
  namespace: 'agency',
  state: {
    data: {
      list: [],
      pagination: {},
    },
    info: {
    },
    resourceData:[],
    resourceTargetKeys:[],

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
    *info({ payload }, { call,put }) {
      const response = yield call(queryAgencyInfo, payload);
      yield put({
        type:'savaAgencyInfo',
        payload:response,
      });
    },
    *resource({ payload }, { call, put }){
      const response = yield call(resourceSearch, payload);
      const targetKeys = [];
      if(response.data){
        response.data.map(item => {
          if(item.chosen){
            targetKeys.push(item.key);
          }
        });
      }
      
      
      yield put({
        type:'saveResource',
        payload:{
          response,
          targetKeys
        },
      });
    },
    *targetKeys({ payload },{ call, put }){
      const response = yield call(resourceDistribution,payload)
      if(response.success){
        yield put({
          type:'saveTargetKeys',
          payload:payload.targetKeys,
        });
      }
      
    }
    
  },
  reducers: {
    save(state, action){
      return {
        ...state,
        data:action.payload.data,
      };
    },
    savaAgencyInfo(state,action){
      return {
        ...state,
        info:action.payload.data,
      };
    },
    saveResource(state,action){
      return {
        ...state,
        resourceData:action.payload.response.data,
        resourceTargetKeys:action.payload.targetKeys,
      }
    },
    saveTargetKeys(state,action){
      return {
        ...state,
        resourceTargetKeys:action.payload,
      }
    }
  },

};