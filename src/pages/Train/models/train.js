import { queryTrain } from '@/services/train'

export default {
  namespace: 'train',

  state: {
    list: {
      list: [],
      pagination: {},
    }
  },

  effects: {
    *list({ payload, callback },{ call, put }){
      const response = yield call(queryTrain, payload);

      if(callback) callback(response);
      if(response){
        yield put({
          type: 'saveTrainList',
          payload: response,
        })
      }
     
    }
  },

  reducers: {
    saveTrainList(state, action){
      return {
        ...state,
        trainList:action.payload.data,
      }
    }
  }
}