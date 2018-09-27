import React, { PureComponent } from 'react';
import moment from 'moment';
import { connect } from 'dva';
import Link from 'umi/link';
import { Row, Col, Card, List, Avatar } from 'antd';

import { Radar } from '@/components/Charts';
import EditableLinkGroup from '@/components/EditableLinkGroup';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

import styles from './index.less';

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
              {/* {currentUser.title} |{currentUser.group} */}
              王府学校 | 管理员
            </div>
          </div>
        </div>
      ) : null;

    const extraContent = (
      <div className={styles.extraContent}>
        <div className={styles.statItem}>
          <p>资源数</p>
          <p>1556</p>
        </div>
        <div className={styles.statItem}>
          <p>学生</p>
          <p>
            88<span> / 100</span>
          </p>
        </div>
        <div className={styles.statItem}>
          <p>教师</p>
          <p> 7<span> / 10</span></p>
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
            {/* <Card
              className={styles.projectList}
              style={{ marginBottom: 24 }}
              title="进行中的项目"
              bordered={false}
              extra={<Link to="/">全部项目</Link>}
              loading={projectLoading}
              bodyStyle={{ padding: 0 }}
            >
              {notice.map(item => (
                <Card.Grid className={styles.projectGrid} key={item.id}>
                  <Card bodyStyle={{ padding: 0 }} bordered={false}>
                    <Card.Meta
                      title={
                        <div className={styles.cardTitle}>
                          <Avatar size="small" src={item.logo} />
                          <Link to={item.href}>{item.title}</Link>
                        </div>
                      }
                      description={item.description}
                    />
                    <div className={styles.projectItemContent}>
                      <Link to={item.memberLink}>{item.member || ''}</Link>
                      {item.updatedAt && (
                        <span className={styles.datetime} title={item.updatedAt}>
                          {moment(item.updatedAt).fromNow()}
                        </span>
                      )}
                    </div>
                  </Card>
                </Card.Grid>
              ))}
            </Card> */}
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
                        <a className={styles.username}><a>李四</a></a>
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
                        <a className={styles.username}><a>李四</a></a>
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
                        <a className={styles.username}><a>李四</a></a>
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
                        <a className={styles.username}><a>李四</a></a>
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
                <List.Item key={4}>
                  <List.Item.Meta
                    avatar={<Avatar src='https://gw.alipayobjects.com/zos/rmsportal/cnrhVkzwxjPwAaCfPbdc.png' />}
                    title={
                      <span>
                        <a className={styles.username}><a>李四</a></a>
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
                <List.Item key={4}>
                  <List.Item.Meta
                    avatar={<Avatar src='https://gw.alipayobjects.com/zos/rmsportal/cnrhVkzwxjPwAaCfPbdc.png' />}
                    title={
                      <span>
                        <a className={styles.username}><a>李四</a></a>
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
                <List.Item key={4}>
                  <List.Item.Meta
                    avatar={<Avatar src='https://gw.alipayobjects.com/zos/rmsportal/cnrhVkzwxjPwAaCfPbdc.png' />}
                    title={
                      <span>
                        <a className={styles.username}><a>李四</a></a>
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
                <List.Item key={4}>
                  <List.Item.Meta
                    avatar={<Avatar src='https://gw.alipayobjects.com/zos/rmsportal/cnrhVkzwxjPwAaCfPbdc.png' />}
                    title={
                      <span>
                        <a className={styles.username}><a>李四</a></a>
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
            {/* <Card
              style={{ marginBottom: 24 }}
              bordered={false}
              title="XX 指数"
              loading={radarData.length === 0}
            >
              <div className={styles.chart}>
                <Radar hasLegend height={343} data={radarData} />
              </div>
            </Card> */}
            <Card
              bodyStyle={{ paddingTop: 12, paddingBottom: 12 }}
              bordered={false}
              title="机构信息"
              
            >
              <div className={styles.members}>
                <Row gutter={48}>
                 
                    <Col span={24} key={`members-item-1`}>
                      <Link to={1}>
                        <span className={styles.member}>机构名称：王府学校</span>
                      </Link>
                    </Col>
                    <Col span={24} key={`members-item-1`}>
                      <Link to={1}>
                        <span className={styles.member}>合作级别：战略合作伙伴</span>
                      </Link>
                    </Col>
                    <Col span={24} key={`members-item-1`}>
                      <Link to={1}>
                        <span className={styles.member}>专属客服：孟亚楠</span>
                      </Link>
                    </Col>
                    <Col span={24} key={`members-item-1`}>
                      <Link to={1}>
                        <span className={styles.member}>服务期限：2018-01-01~2019-01-01</span>
                      </Link>
                    </Col>
                    
                    
                    
                </Row>
              </div>
            </Card>
          </Col>
        </Row>
      </PageHeaderWrapper>
      
    );
  }
}
