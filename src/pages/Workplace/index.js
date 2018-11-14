import React, { PureComponent } from 'react';
import { connect } from 'dva';
import Link from 'umi/link';
import moment from 'moment';
import EditableLinkGroup from '@/components/EditableLinkGroup';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import DescriptionList from '@/components/DescriptionList';

import { Row, Col, Card, List, Avatar, Button } from 'antd';

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
@connect(({ global }) => ({
  currentUser: global.currentUser,
}))
class Workplace extends PureComponent {
  componentDidMount() {
    
  }

  componentWillUnmount() {
   
  }

  renderActivities() {
    const {
      currentUser: { dynamics },
    } = this.props;
    return dynamics.map(item => (
      <List.Item key={item.id}>
        <List.Item.Meta
          avatar={<Avatar src={item.account} />}
          title={
            <span>
              <a className={styles.username}>{item.username}</a>
                &nbsp;
              <span className={styles.event}>将<a>{item.resourceName}</a>加入了愿望单</span>
            </span>
            }
          description={
            <span className={styles.datetime} title={item.createTime}>
              {moment(item.createTime).fromNow()}
            </span>
            }
        />
      </List.Item>
      ));
  }

  

  render() {
    const {
      currentUser,
      currentUserLoading,
    } = this.props;
    const loadMore =
        currentUser.dynamics.length > 0 ? (
          <div style={{ textAlign: 'center', marginTop: 16,marginBottom:30 }}>
            <Button style={{ paddingLeft: 48, paddingRight: 48 }}>
              {currentUserLoading ? (
                <span>
                  <Icon type="loading" /> 加载中...
                </span>
            ) : (
              '加载更多'
            )}
            </Button>
          </div>
      ) : null;
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
              loading={currentUserLoading}
            >
              <List 
                loading={currentUserLoading} 
                loadMore={loadMore} 
                size="large"
              >
                <div className={styles.activitiesList}>{this.renderActivities()}</div>
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
                <Description term="机构名称"> {currentUser.organizationName}</Description>
              </DescriptionList>
              {/* <DescriptionList style={{ marginBottom: 24 }} col={1}>
                <Description term="合作级别">战略合作伙伴</Description>
              </DescriptionList>   */}
              <DescriptionList style={{ marginBottom: 24 }} col={1}>
                <Description term="专属客服">{currentUser.salesman}</Description>
              </DescriptionList>
              {/* <DescriptionList style={{ marginBottom: 24 }} col={1}>
                <Description term="服务期限">2018-01-01~2019-01-01</Description>
              </DescriptionList> */}
              
            </Card>
          </Col>
        </Row>
      </PageHeaderWrapper>
      
    );
  }
}
