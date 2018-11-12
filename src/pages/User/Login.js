/**
 * @file 登陆页面
 * @author guoyuming
 * @copyright 中图数字科技
 */

import React, { Component } from 'react';
import { connect } from 'dva';
import { Alert,message } from 'antd';
import Login from '@/components/Login';
import Geetest from '@/components/Geetest';
import styles from './Login.less';
import { RGCaptcha, reset } from 'react-geetest-captcha';


const { UserName, Password, Submit } = Login;
const CAPTCHA_NAME = 'LoginCaptcha';

@connect(({ login, loading }) => ({
  login,
  submitting: loading.effects['login/login'],
}))

class LoginPage extends Component {

  state ={
    captcha:false
  }
  
  componentWillMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'login/geetest',
    });
  }
  /**
   * @method 
   * @desc 登陆提交
   */
  handleSubmit = (err, values) => {
    if (!err) {
      if(!this.state.captcha){
        message.error("请点击按钮进行验证")
        return;
      }
      const { dispatch } = this.props;
      dispatch({
        type: 'login/geetest',
      });
      dispatch({
        type: 'login/login',
        payload: {
          ...values,
          ...this.state.captchaData,
        },
        callback:(_ = (res) =>{
          if(!res.success){
            message.error("账户或密码错误")
            this.resetCaptchaForm();
          }
        })
        
      });
      
    }
  };
  /**
   * @method
   * @desc 重置验证码
   */
  resetCaptchaForm() {
    reset(CAPTCHA_NAME);
 
    const { dispatch } = this.props;
    dispatch({
      type: 'login/geetest',
    });
    this.setState({
      captcha: false,
      captchaData:{},
    });
    
  }
  /**
   * @method
   * @desc 验证码回调
   */
  handlerCaptchaSuccess = (result) => {
    this.setState({
      captchaData:result,
      captcha:true,
    });
  };

  render() {
    const { login, submitting } = this.props;
    return (
      <div className={styles.main}>
        <Login
          onSubmit={this.handleSubmit}
          ref={form => {
            this.loginForm = form;
          }}
        >
          <UserName name="account" placeholder="用户名" />
          <Password
            name="password"
            placeholder="密码"
            onPressEnter={() => this.loginForm.validateFields(this.handleSubmit)}
          />
          { login.geetest.gt && 
            <RGCaptcha
            name={CAPTCHA_NAME}
            width="100%"
            onSuccess={this.handlerCaptchaSuccess}
            data={{
              gt:login.geetest.gt,
              challenge:login.geetest.challenge,
              success:login.geetest.success
              }
            }
          />
          }
          <div />
          <Submit loading={submitting}>登录</Submit>
        </Login>
      </div>
    );
  }
}

export default LoginPage;
