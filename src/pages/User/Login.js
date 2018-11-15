/**
 * @file 登陆页面
 * @author guoyuming
 * @copyright 中图数字科技
 */

import React, { Component } from 'react';
import { connect } from 'dva';
import { message } from 'antd';
import Login from '@/components/Login';
import { RGCaptcha, reset } from 'react-geetest-captcha';
import styles from './Login.less';


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
      const { captcha, captchaData } = this.state
      const { dispatch } = this.props;
      if(!captcha){
        message.error("请点击按钮进行验证")
        return;
      }
      dispatch({
        type: 'login/geetest',
      });
      dispatch({
        type: 'login/login',
        payload: {
          ...values,
          ...captchaData,
        },
        callback:((res) =>{
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
   * @desc 验证码回调
   */
  handlerCaptchaSuccess = (result) => {
    this.setState({
      captchaData:result,
      captcha:true,
    });
  };

  /**
   * @method
   * @desc 重置验证码
   */
  resetCaptchaForm() {
    reset(CAPTCHA_NAME);
    this.setState({
      captcha: false,
      captchaData:{},
    });
    
  }
  
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
