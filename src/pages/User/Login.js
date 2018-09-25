import React, { Component } from 'react';
import { connect } from 'dva';
import { Alert,message } from 'antd';
import Login from '@/components/Login';
import Geetest from '@/components/Geetest';
import styles from './Login.less';


const { UserName, Password, Submit } = Login;

@connect(({ login, loading }) => ({
  login,
  submitting: loading.effects['login/login'],
}))

class LoginPage extends Component {
  state = {

  };
  
  componentWillMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'login/geetest',
    });
  }
  handleSubmit = (err, values) => {
    if(!this.state.captcha){
      this.setState({
        captchaErr:true,
      });
      return;
    }

    if (!err) {
      const { dispatch } = this.props;

      dispatch({
        type: 'login/login',
        payload: {
          ...values,
          ...this.state.captchaData,
        },
      });
    }
  };
  handlerCaptchaSuccess = (result) => {
    
    this.setState({
      captchaData:result,
      captcha:true,
      captchaErr:false,

    });
  };
  renderMessage = content => (
    <Alert style={{ marginBottom: 24 }} message={content} type="error" showIcon />
  );
  

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
          {!login.success && !submitting && this.renderMessage('账户或密码错误')}
          <UserName name="account" placeholder="用户名" />
          <Password
            name="password"
            placeholder="密码"
            onPressEnter={() => this.loginForm.validateFields(this.handleSubmit)}
          />
          {this.state.captchaErr && this.renderMessage('请点击下方进行验证')}
          <Geetest 
            width="100%"
            gt={login.geetest.gt}
            challenge={login.geetest.challenge}
            success={login.geetest.success}
            onSuccess={this.handlerCaptchaSuccess}
          />
          <div />
          <Submit loading={submitting}>登录</Submit>
        </Login>
      </div>
    );
  }
}

export default LoginPage;
