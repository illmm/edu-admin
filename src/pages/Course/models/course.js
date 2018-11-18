import { 
  queryOnlineCourse, 
  queryVideoCourse, 
  addCourse,
  queryBBCourse 
} from '@/services/course';

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
    bbCourse:[],
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
    *add({ payload, callback },{ call, put }){
      const response = yield call(addCourse,payload);
      if(callback) callback(response);
      yield put({
        type: 'addHandle',
        payload: response
      });
    },
    *bbCourse({ payload, callback },{ call, put }){
      const response = yield call(queryBBCourse,payload);
      if(callback) callback(response);
      yield put({
        type: 'saveBBCourse',
        payload: response,

      })

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
    },
    addHandle(state, action){
      return {
        ...state,
        addSuccess: action.payload.success,
      }
    },
    saveBBCourse(state, action){
      return {
        ...state,
        bbCourse: action.payload.data,
      }
    }
  }
}