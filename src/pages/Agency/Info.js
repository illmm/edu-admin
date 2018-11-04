import React, { Component, Fragment } from 'react';
import Debounce from 'lodash-decorators/debounce';
import Bind from 'lodash-decorators/bind';
import { connect } from 'dva';
import moment from 'moment';
import {
  Button,
  Menu,
  Dropdown,
  Icon,
  Row,
  Col,
  Card,
  Form,
  Modal,
  Transfer,
} from 'antd';
import DescriptionList from '@/components/DescriptionList';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './Info.less';

const { Description } = DescriptionList;
const ButtonGroup = Button.Group;

const getWindowWidth = () => window.innerWidth || document.documentElement.clientWidth;

const EditResource = Form.create()(props =>{
  const { form,modalVisible,resourceTabKey,handleModalVisible,handleResourceTabChange } = props;
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      //form.resetFields();
      //handleAdd(fieldsValue);
    });
  };
  console.log(resourceTabKey);
  const targetKeys = [];
  const mockData = [];
  for (let i = 0; i < 20; i++) {
    const data = {
      key: i.toString(),
      title: `海外教材${i + 1}`,
      description: `海外教材${i + 1}`,
      chosen: Math.random() * 2 > 1,
    };
    if (data.chosen) {
      targetKeys.push(data.key);
    }
    mockData.push(data);
  }
  const filterOption = (inputValue, option) => {
    return option.description.indexOf(inputValue) > -1;
  }
  return(
    <Modal
      destroyOnClose
      title="分配资源"
      okText="完成"
      visible={modalVisible}
      onOk={okHandle}
      width={900}
      
      onCancel={() => handleModalVisible()}
    >
     <Card
        bordered={false}
        className={styles.tabsCard}
        tabList={classifyTabList}
        onTabChange={handleResourceTabChange}
        activeTabKey={resourceTabKey}
        
      >
      <Transfer
          dataSource={mockData}
          showSearch
          filterOption={filterOption}
          targetKeys={targetKeys}
          //onChange={this.handleChange}
          listStyle={{
            width: 376,
            height: 400,
          }}
          titles={['资源库', '已分配']}
          render={item => item.title}
        />
      </Card>
      

    </Modal>
  );
});


const menu = (
  <Menu>
    <Menu.Item key="1">新增联系人</Menu.Item>
    <Menu.Item key="2">批量导入资源</Menu.Item>
    <Menu.Item key="3">批量导入成员</Menu.Item>
  </Menu>
);


const agencyStatus = ["停止服务","服务中"];
const extra = info => (
  <Row>
    <Col xs={24} sm={12}>
      <div className={styles.textSecondary}>状态</div>
      <div className={styles.heading}>{agencyStatus[info.status]}</div>
    </Col>
    <Col xs={24} sm={12}>
      <div className={styles.textSecondary}>剩余天数</div>
      <div className={styles.heading}>{moment(info.endDate).diff(moment(), 'days')}天</div>
    </Col>
  </Row>
);

const description = info => (
  <DescriptionList className={styles.headerList} size="small" col="2">
    <Description term="销售员">{info.salesman}</Description>
    <Description term="学生数量">{info.studentNum}位</Description>
    <Description term="创建时间">{moment(info.createTime).format('YYYY-MM-DD HH:mm:ss')}</Description>
    <Description term="教师数量">{info.teacherNum}位</Description>
    <Description term="服务起止日期">{moment(info.startDate).format('YYYY-MM-DD')}至{moment(info.endDate).format('YYYY-MM-DD')}</Description>
    <Description term="描述">{info.description}</Description>
  </DescriptionList>
);

const tabList = [
  {
    key: 'detail',
    tab: '详情',
  },
  
];

const classifyTabList = [
  {
    key: 'tab1',
    tab: '海外教材',
  },
  {
    key: 'tab2',
    tab: '阅读世界',
  },
  {
    key: 'tab3',
    tab: '视频课程',
  },
  {
    key: 'tab4',
    tab: '在线课程',
  },
  {
    key: 'tab5',
    tab: '培训',
  },
  {
    key: 'tab6',
    tab: '测评',
  },
  {
    key: 'tab7',
    tab: '套餐',
  },
];

const columns = [
  {
    title: '教材名称',
    dataIndex: 'type',
    key: 'type',
  },
  {
    title: '操作人',
    dataIndex: 'name',
    key: 'name',
  },
  
  {
    title: '分配时间',
    dataIndex: 'updatedAt',
    key: 'updatedAt',
  },
  {
    title: '到期时间',
    dataIndex: 'updatedAt',
    key: 'updatedAt',
  },
  
];

@connect(({ agency, loading }) => ({
  agency,
  loading: loading.effects['agency/info'],
}))
@Form.create()
class AgencyInfo extends Component {
  state = {
    resourceTabKey: 'tab1',
    stepDirection: 'horizontal',
    resourceModalVisible:false,
  };
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'agency/info',
      payload:this.props.match.params.id
    });

    this.setStepDirection();
    window.addEventListener('resize', this.setStepDirection, { passive: true });
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.setStepDirection);
    this.setStepDirection.cancel();
  }

  onOperationTabChange = key => {
    //this.setState({ operationkey: key });
  };
  handleResourceTabChange = key => {
    this.setState({ resourceTabKey: key });
    console.log(this.state.resourceTabKey);
  };

  @Bind()
  @Debounce(200)
  setStepDirection() {
    const { stepDirection } = this.state;
    const w = getWindowWidth();
    if (stepDirection !== 'vertical' && w <= 576) {
      this.setState({
        stepDirection: 'vertical',
      });
    } else if (stepDirection !== 'horizontal' && w > 576) {
      this.setState({
        stepDirection: 'horizontal',
      });
    }
  }
  handleResourceModalVisible = flag => {
    this.setState({
      resourceModalVisible: !!flag,
    });
  };
  render() {
    const { resourceModalVisible } = this.state;
    const { 
      agency: {info},
    } = this.props;
    const contentList = {
      // tab1: (
      //   <Table
      //     pagination={false}
      //     loading={loading}
      //     dataSource={}
      //     columns={columns}
      //   />
      // ),
      // tab2: (
      //   <Table
      //     pagination={false}
      //     loading={loading}
      //     dataSource={}
      //     columns={columns}
      //   />
      // ),
      // tab3: (
      //   <Table
      //     pagination={false}
      //     loading={loading}
      //     dataSource={}
      //     columns={columns}
      //   />
      // ),
    };
    const action = (
      <Fragment>
        <ButtonGroup>
          <Button>编辑</Button>
          <Dropdown overlay={menu} placement="bottomRight">
            <Button>
              <Icon type="ellipsis" />
            </Button>
          </Dropdown>
        </ButtonGroup>
        <Button type="primary" onClick={() => this.handleResourceModalVisible(true)}>资源管理</Button>
      </Fragment>
    );

    const resourceProps = {
      handleModalVisible: this.handleResourceModalVisible,
      handleResourceTabChange:this.handleResourceTabChange,
      resourceTabKey:this.state.resourceTabKey,

    };
    return (
      <PageHeaderWrapper
        title={`机构名称：${info.name}`}
        logo={
          <img alt="" src={info.logo} />
        }
        action={action}
        content={description(info)}
        extraContent={extra(info)}
        tabList={tabList}
      >
        
        <Card title="客户信息" style={{ marginBottom: 24 }} bordered={false}>
          <DescriptionList style={{ marginBottom: 24 }}>
            <Description term="联系人">李四</Description>
            <Description term="联系方式">18100000000</Description>
            <Description term="联系地址">
              北京市朝阳区工体东路16号
            </Description>
          </DescriptionList>
          <DescriptionList style={{ marginBottom: 24 }} title="信息组">
            <Description term="机构类型">培训机构</Description>
            <Description term="机构规模">大型</Description>
            <Description>&nbsp;</Description>
          </DescriptionList>
        </Card>
        
        <Card
          style={{ marginBottom: 24 }}
          className={styles.tabsCard}
          bordered={false}
          tabList={classifyTabList}
          onTabChange={this.onOperationTabChange}
        >
          {/* {contentList[resourceTabKey]} */}
        </Card>
        <Card title="客户近半年购买记录" style={{ marginBottom: 24 }} bordered={false}>
          <div className={styles.noData}>
            <Icon type="frown-o" />
            暂无数据
          </div>
        </Card>
        <EditResource modalVisible={resourceModalVisible} {...resourceProps}/>
      </PageHeaderWrapper>
      
    );
  }
}

export default AgencyInfo;
