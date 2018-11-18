import React from 'react';
import { Button } from 'antd';
import Link from 'umi/link';
import Result from '@/components/Result';
import styles from './AddResult.less';

const actions = (
  <div className={styles.actions}>
    <a href="/course/video">
      <Button size="large" type="primary">
        课程列表
      </Button>
    </a>
    <Link to="/">
      <Button size="large">
        首页
      </Button>
    </Link>
  </div>
);

const AddResult = ({ location }) => (
  <Result
    className={styles.registerResult}
    type="success"
    title={
      <div className={styles.title}>
        {`课程：${location.state ? location.state.title : ''} 添加成功`}
      
      </div>
    }
    description="可在课程详细页面进行课时管理"
    actions={actions}
    style={{ marginTop: 56 }}
  />
);

export default AddResult;
