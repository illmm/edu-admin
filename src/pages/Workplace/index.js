import React, { PureComponent } from 'react';
import { connect } from 'dva';
import Link from 'umi/link';
import { Row, Col, Card, List, Avatar } from 'antd';

import EditableLinkGroup from '@/components/EditableLinkGroup';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import DescriptionList from '@/components/DescriptionList';

import styles from './index.less';
const { Description } = DescriptionList;
const links = [
  {
    title: '新增成员',
    href: '',
  },
  {
    title: '海外教材',
    href: '',
  },
  {
    title: '阅读世界',
    href: '',
  },
  {
    title: '视频课程',
    href: '',
  },
  {
    title: '在线课程',
    href: '',
  },
  {
    title: '培训',
    href: '',
  },
  {
    title: '个人设置',
    href: '',
  },
  
];

export default
@connect(({ global, project, activities, chart, loading }) => ({
  currentUser: global.currentUser,
  project,
  activities,
  chart,
  currentUserLoading: loading.effects['global/fetchCurrent'],
  projectLoading: loading.effects['project/fetchNotice'],
  activitiesLoading: loading.effects['activities/fetchList'],
}))
class Workplace extends PureComponent {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'global/fetchCurrent',
    });
    dispatch({
      type: 'activities/fetchList',
    });
    dispatch({
      type: 'chart/fetch',
    });
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'chart/clear',
    });
  }

  

  render() {
    const {
      currentUser,
      currentUserLoading,
      activitiesLoading,
    } = this.props;

    const pageHeaderContent =
      currentUser && Object.keys(currentUser).length ? (
        <div className={styles.pageHeaderContent}>
          <div className={styles.avatar}>
            <Avatar size="large" src={currentUser.avatar} />
          </div>
          <div className={styles.content}>
            <div className={styles.contentTitle}>
              您好，
              {currentUser.name}
              ，祝你开心每一天！
            </div>
            <div>
              {currentUser.organizationName} |{currentUser.roleName}
              
            </div>
          </div>
        </div>
      ) : null;

    const extraContent = (
      <div className={styles.extraContent}>
        <div className={styles.statItem}>
          <p>资源数</p>
          <p>{currentUser.resourceNum}</p>
        </div>
        <div className={styles.statItem}>
          <p>学生</p>
          <p>
            {currentUser.usedStudentNum}<span> / {currentUser.studentNum}</span>
          </p>
        </div>
        <div className={styles.statItem}>
          <p>教师</p>
          <p> {currentUser.usedTeacherNum}<span> / {currentUser.teacherNum}</span></p>
        </div>
      </div>
    );

    return (
      <PageHeaderWrapper
        loading={currentUserLoading}
        content={pageHeaderContent}
        extraContent={extraContent}
      >
        <Row gutter={24}>
          <Col xl={16} lg={24} md={24} sm={24} xs={24}>
            <Card
              bodyStyle={{ padding: 0 }}
              bordered={false}
              className={styles.activeCard}
              title="动态"
              loading={activitiesLoading}
            >
              <List loading={activitiesLoading} size="large">
                <div className={styles.activitiesList}>
                <List.Item key={1}>
                  <List.Item.Meta
                    avatar={<Avatar src='https://gw.alipayobjects.com/zos/rmsportal/cnrhVkzwxjPwAaCfPbdc.png' />}
                    title={
                      <span>
                        <a className={styles.username}>李四</a>
                        &nbsp;
                        <span className={styles.event}>将<a>十万个为什么</a>加入了愿望单</span>
                      </span>
                    }
                    description={
                      <span className={styles.datetime} title={1}>
                        8 hours ago
                      </span>
                    }
                  />
                </List.Item>
                <List.Item key={2}>
                  <List.Item.Meta
                    avatar={<Avatar src='https://gw.alipayobjects.com/zos/rmsportal/cnrhVkzwxjPwAaCfPbdc.png' />}
                    title={
                      <span>
                        <a className={styles.username}>李四</a>
                        &nbsp;
                        <span className={styles.event}>将<a>十万个为什么</a>加入了愿望单</span>
                      </span>
                    }
                    description={
                      <span className={styles.datetime} title={1}>
                        8 hours ago
                      </span>
                    }
                  />
                </List.Item>
                <List.Item key={3}>
                  <List.Item.Meta
                    avatar={<Avatar src='https://gw.alipayobjects.com/zos/rmsportal/cnrhVkzwxjPwAaCfPbdc.png' />}
                    title={
                      <span>
                        <a className={styles.username}>李四</a>
                        &nbsp;
                        <span className={styles.event}>将<a>十万个为什么</a>加入了愿望单</span>
                      </span>
                    }
                    description={
                      <span className={styles.datetime} title={1}>
                        8 hours ago
                      </span>
                    }
                  />
                </List.Item>
                <List.Item key={4}>
                  <List.Item.Meta
                    avatar={<Avatar src='https://gw.alipayobjects.com/zos/rmsportal/cnrhVkzwxjPwAaCfPbdc.png' />}
                    title={
                      <span>
                        <a className={styles.username}>李四</a>
                        &nbsp;
                        <span className={styles.event}>登陆了系统</span>
                      </span>
                    }
                    description={
                      <span className={styles.datetime} title={1}>
                        8 hours ago
                      </span>
                    }
                  />
                </List.Item>
                <List.Item key={5}>
                  <List.Item.Meta
                    avatar={<Avatar src='https://gw.alipayobjects.com/zos/rmsportal/cnrhVkzwxjPwAaCfPbdc.png' />}
                    title={
                      <span>
                        <a className={styles.username}>李四</a>
                        &nbsp;
                        <span className={styles.event}>登陆了系统</span>
                      </span>
                    }
                    description={
                      <span className={styles.datetime} title={1}>
                        8 hours ago
                      </span>
                    }
                  />
                </List.Item>
                <List.Item key={6}>
                  <List.Item.Meta
                    avatar={<Avatar src='https://gw.alipayobjects.com/zos/rmsportal/cnrhVkzwxjPwAaCfPbdc.png' />}
                    title={
                      <span>
                        <a className={styles.username}>李四</a>
                        &nbsp;
                        <span className={styles.event}>登陆了系统</span>
                      </span>
                    }
                    description={
                      <span className={styles.datetime} title={1}>
                        8 hours ago
                      </span>
                    }
                  />
                </List.Item>
                <List.Item key={7}>
                  <List.Item.Meta
                    avatar={<Avatar src='https://gw.alipayobjects.com/zos/rmsportal/cnrhVkzwxjPwAaCfPbdc.png' />}
                    title={
                      <span>
                        <a className={styles.username}>李四</a>
                        &nbsp;
                        <span className={styles.event}>登陆了系统</span>
                      </span>
                    }
                    description={
                      <span className={styles.datetime} title={1}>
                        8 hours ago
                      </span>
                    }
                  />
                </List.Item>
                <List.Item key={8}>
                  <List.Item.Meta
                    avatar={<Avatar src='https://gw.alipayobjects.com/zos/rmsportal/cnrhVkzwxjPwAaCfPbdc.png' />}
                    title={
                      <span>
                        <a className={styles.username}>李四</a>
                        &nbsp;
                        <span className={styles.event}>登陆了系统</span>
                      </span>
                    }
                    description={
                      <span className={styles.datetime} title={1}>
                        8 hours ago
                      </span>
                    }
                  />
                </List.Item>
                </div>
              </List>
              
            </Card>
          </Col>
          <Col xl={8} lg={24} md={24} sm={24} xs={24}>
            <Card
              style={{ marginBottom: 24 }}
              title="快速开始 / 便捷导航"
              bordered={false}
              bodyStyle={{ padding: 0 }}
            >
              <EditableLinkGroup onAdd={() => {}} links={links} linkElement={Link} />
            </Card>
            
            <Card
              bodyStyle={{ paddingTop: 12, paddingBottom: 12 }}
              bordered={false}
              title="机构信息"
              
            >
              
              <DescriptionList style={{ marginBottom: 24 }} col={1}>
                <Description term="机构名称">王府学校</Description>
              </DescriptionList>
              <DescriptionList style={{ marginBottom: 24 }} col={1}>
                <Description term="合作级别">战略合作伙伴</Description>
              </DescriptionList>  
              <DescriptionList style={{ marginBottom: 24 }} col={1}>
                <Description term="专属客服">孟亚楠</Description>
              </DescriptionList>
              <DescriptionList style={{ marginBottom: 24 }} col={1}>
                <Description term="服务期限">2018-01-01~2019-01-01</Description>
              </DescriptionList>
              
            </Card>
          </Col>
        </Row>
      </PageHeaderWrapper>
      
    );
  }
}
