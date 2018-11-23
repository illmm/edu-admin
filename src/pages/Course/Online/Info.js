import React, { Fragment, PureComponent } from 'react';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import DescriptionList from '@/components/DescriptionList';
import moment from 'moment';
import { DragDropContext, DragSource, DropTarget } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import update from 'immutability-helper';
import Link from 'umi/link';

import { 
  Card, 
  Button, 
  Row, 
  Col, 
  Table, 
  Divider, 
  Badge, 
  Icon,
  Modal,
  Form, 
  Input,
} from 'antd';

import styles from '../Styles.less';

const { Description } = DescriptionList;










@Form.create()
@connect(({ course }) => ({
  course,
}))
class VideoInfo extends PureComponent {


  componentDidMount() {}


  render() {
    const { 
      course:{ members,info }, 
    } = this.props;
    // {moment(info.startDate).format('YYYY-MM-DD')}至{moment(info.endDate).format('YYYY-MM-DD')}
    const description = () => (
      <DescriptionList className={styles.headerList} size="small" col="2">
        <Description term="课程编号">课程编号</Description>
        <Description term="分类">分类</Description>
        <Description term="标签">标签</Description>
        <Description term="价格">￥280.00</Description>
        <Description term="原始价格">￥280.00</Description>
        <Description term="创建时间">2018/9/1 12:00</Description>
        <Description term="关键字">关键字</Description>
        <Description term="适用人群">适用人群</Description>
      </DescriptionList>
    );
    const action = (
      <Fragment>
        {/* <ButtonGroup>
          <Button>编辑</Button>
          <Dropdown overlay={menu} placement="bottomRight">
            <Button>
              <Icon type="ellipsis" />
            </Button>
          </Dropdown>
        </ButtonGroup> */}
        {/* <Button type="primary" >
          编辑
        </Button> */}
      </Fragment>
    );
    const tabList = [
      {
        key: 'members',
        tab: '成员列表',
      },
      
    ];
    
    const extra = () => (
      <Row>
        <Col xs={24} sm={12}>
          <div className={styles.textSecondary}>状态</div>
          <div className={styles.heading}>已发布</div>
        </Col>
        <Col xs={24} sm={12}>
          <div className={styles.textSecondary}>浏览量</div>
          <div className={styles.heading}>1821次</div>
        </Col>
      </Row>
    );
    


    return (
      <PageHeaderWrapper
        title="Managing the Young Learner Classroom	"
        logo="//static.cnpeducation.com/20170119112754df221e.jpg"
        action={action}
        content={description()}
        extraContent={extra()}
        tabList={tabList}
      >
        <Card title="成员列表" style={{ marginBottom: 24 }} bordered={false}>
          <Table
            dataSource={members}
          /> 
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default VideoInfo;

