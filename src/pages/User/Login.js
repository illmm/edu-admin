import React, { Component } from 'react';
import { connect } from 'dva';
import { Alert,Button } from 'antd';
import Login from '@/components/Login';
import Geetest from '@/components/Geetest';
import styles from './Login.less';


const { UserName, Password, Submit } = Login;

@connect(({ login, loading }) => ({
  login,
  submitting: loading.effects['login/login'],
}))

class LoginPage extends Component {
  state = {};
  
  componentWillMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'login/geetest',
    });
  }
  handleSubmit = (err, values) => {
    if (!err) {
      const { dispatch } = this.props;
      dispatch({
        type: 'login/login',
        payload: {
          ...values,
        },
      });
    }
  };
  handlerGeetest = (result) => {
    
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
          <Geetest 
            width="100%"
            gt={login.geetest.gt}
            challenge={login.geetest.challenge}
            success={login.geetest.success}
            onSuccess={this.handlerGeetest}
          />
          <div />
          <Submit loading={submitting}>登录</Submit>
        </Login>
      </div>
    );
  }
}

export default LoginPage;
