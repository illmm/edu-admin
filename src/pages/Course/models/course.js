import { queryOnlineCourse, queryVideoCourse, addCourse } from '@/services/course';

export default {
  namespace: 'course',

  state: {
    onlineList: {
      list: [],
      pagination: {},
    },
    videoList: {
      list: [],
      pagination: {},
    },
  },

  effects: {
    *video({ payload, callback },{ call, put }){
      const response = yield call(queryVideoCourse, payload);
      if(callback) callback(response);
      yield put({
        type: 'saveVideoList',
        payload:response,
      })
    },
    *online({ payload, callback },{ call, put }){
      const response = yield call(queryOnlineCourse, payload);
      if(callback) callback(response);
      yield put({
        type: 'saveOnlineList',
        payload:response,
      })
    },
    *add({ payload, callback },{ call }){
      const response = yield call(addCourse,payload);
      if(callback) callback(response);
      
    },
  },

  reducers: {
    saveOnlineList(state, action){
      return {
        ...state,
        onlineList:action.payload.data,
      }
    },
    saveVideoList(state, action){
      return {
        ...state,
        videoList:action.payload.data,
      }
    }
  }
}