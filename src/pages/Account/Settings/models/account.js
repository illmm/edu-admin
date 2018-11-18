import { modifyPwd } from '@/services/user';

export default {
  namespace: 'account',

  state: {
    
  },

  effects: {
    *modifyPwd({ payload, callback },{ call }){
      const response = yield call(modifyPwd,payload)
      if(callback) callback(response);
    }
  },

  reducers: {
    
  },
};
