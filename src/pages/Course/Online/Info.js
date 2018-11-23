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
const FormItem = Form.Item;









/* eslint-disable */
@Form.create()
class VideoInfo extends PureComponent {


  state = {
    data: [
      {
        key: '1',
        name: '课时1',
        age: '2018-11-11 12:00',
        address: 'New York No. 1 Lake Park',
      },
      {
        key: '2',
        name: '课时2',
        age: '2018-11-11 12:00',
        address: 'London No. 1 Lake Park',
      },
      {
        key: '3',
        name: '课时3',
        age: '2018-11-11 12:00',
        address: 'Sidney No. 1 Lake Park',
      },
    ],
    addModalVisible: false,
  };

  componentDidMount() {}

  moveRow = (dragIndex, hoverIndex) => {
    const { data } = this.state;
    const dragRow = data[dragIndex];

    this.setState(
      update(this.state, {
        data: {
          $splice: [[dragIndex, 1], [hoverIndex, 0, dragRow]],
        },
      })
    );
  };

  handleAddModalVisible = flag =>{
    
    this.setState({
      addModalVisible: !!flag,
    });
  }

  render() {
    const { addModalVisible } = this.state;

    const { form: { getFieldDecorator } } = this.props;
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
        <Button type="primary" onClick={() => this.handleAddModalVisible(true)}>
          编辑
        </Button>
      </Fragment>
    );
    const tabList = [
      {
        key: 'teacher',
        tab: '老师列表',
      },
      {
        key: 'student',
        tab: '学生列表',
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
    

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 18 },
      },
    };

    return (
      <PageHeaderWrapper
        title="Managing the Young Learner Classroom	"
        logo={<img alt="" src="//static.cnpeducation.com/20170119112754df221e.jpg" />}
        action={action}
        content={description()}
        extraContent={extra()}
        //tabList={tabList}
      >
      </PageHeaderWrapper>
    );
  }
}

export default VideoInfo;

