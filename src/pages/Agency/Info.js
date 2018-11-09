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
  Input,
  Select,
  AutoComplete,
} from 'antd';
import DescriptionList from '@/components/DescriptionList';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './Info.less';

const { Description } = DescriptionList;
const ButtonGroup = Button.Group;
const FormItem = Form.Item;

const getWindowWidth = () => window.innerWidth || document.documentElement.clientWidth;

const EditResource = Form.create()(props =>{
  const { 
    form,
    form: { getFieldDecorator },
    handleModalVisible,
    handleResourceTabChange,
    handleSelectResourceChange,
    handleResourceChange,
    handleSourceSearch,
    handleResourceSearch,
    dataSource, 
    modalVisible,
    resourceTabKey,
    resourceData,
    resourceTargetKeys,
  } = props;

  const filterOption = (inputValue, option) => {
    return option.description.indexOf(inputValue) > -1;
  }
  const handleSearch = e => {
    e.preventDefault();
    form.validateFields((err, fieldsValue) => {
      console.log(fieldsValue);
      if (err) return;
      handleResourceSearch(fieldsValue)
     
    });
  };
  const handleTabChange = (key) => {
    form.resetFields();
    handleResourceTabChange(key);
  }

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 6 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 18 },
    },
    colon:false,
  };
  
  return(
    <Modal
      destroyOnClose
      title="分配资源"
      okText="完成"
      visible={modalVisible}
      width={950}
      footer={null}
      onCancel={() => handleModalVisible()}
    >
     <Card
        bordered={false}
        className={styles.tabsCard}
        tabList={classifyTabList}
        onTabChange={handleTabChange}
        activeTabKey={resourceTabKey}
        
      >
    <div className={styles.tableListForm}>
     <Form onSubmit={handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={7} sm={24}>
            <FormItem {...formItemLayout}  label="编号">
              {getFieldDecorator('number')( 
                <Input></Input>
              )}
            </FormItem>
          </Col>
          <Col md={7} sm={24}>
            <FormItem {...formItemLayout} label="标题">
              {getFieldDecorator('title')(
                <Input></Input>
              )}
            </FormItem>
          </Col>
          <Col md={7} sm={24}>
            <FormItem {...formItemLayout} label="来源">
              {getFieldDecorator('sourceName')(
                <AutoComplete
                  dataSource={dataSource}
                  style={{ width: 200 }}
                  // onSelect={onSelect}
                  onSearch={handleSourceSearch}
                />
              )}
            </FormItem>
          </Col>
          <Col md={3} sm={24}>
            <div style={{ overflow: 'hidden' }}>
            <div style={{ float: 'right', marginBottom: 24 }}>
              <Button type="primary" htmlType="submit">
              查询
              </Button>
            </div>
            </div>
          </Col>
        </Row>
        
        
      </Form>
      </div>
      <Transfer
          dataSource={resourceData}
          filterOption={filterOption}
          targetKeys={resourceTargetKeys}
          onChange={handleResourceChange}
          onSelectChange={handleSelectResourceChange}
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
    tab: '已购资源',
  },
  
];

const classifyTabList = [
  {
    key: '3',
    tab: '海外教材',
  },
  {
    key: '4',
    tab: '阅读世界',
  },
  {
    key: '1',
    tab: '视频课程',
  },
  {
    key: '2',
    tab: '在线课程',
  },
  {
    key: '5',
    tab: '培训',
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
    resourceTabKey: '3',
    stepDirection: 'horizontal',
    resourceModalVisible:false,
    agencyId:this.props.match.params.id,
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
   /* 已分配资源列表Tab改变事件 */
  onOperationTabChange = key => {
    //this.setState({ operationkey: key });
  };
   /* 资源分配Tab改变事件 */
  handleResourceTabChange = key => {
    this.setState({ 
      resourceTabKey: key 
    },() => {
      this.handleResourceSearch();
    });
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
   /* 资源管理弹出框 */
  handleResourceModalVisible = flag => {
    if(flag){
      this.handleResourceSearch();
    }
    this.setState({
      resourceModalVisible: !!flag,
    });
  };
  /* 来源自动完成 */
  handleSourceSearch = (value) => {
    const { dispatch } = this.props;
    dispatch({
      type:'global/queryAutoSource',
      payload:{ name:value },
      callback:(_ = res =>{
        this.setState({
          dataSource:res.data
        });
      })
    })
  }
  /* 资源分配选择改变事件 */
  handleSelectResourceChange = (sourceSelectedKeys, targetSelectedKeys) => {
    //this.setState({ selectedKeys: [...sourceSelectedKeys, ...targetSelectedKeys] });

    console.log('sourceSelectedKeys: ', sourceSelectedKeys);
    console.log('targetSelectedKeys: ', targetSelectedKeys);
  }
  /* 资源分配移动事件 */
  handleResourceChange = (nextTargetKeys, direction, moveKeys) => {

    const { dispatch } = this.props;
    dispatch({
      type:'agency/targetKeys',
      payload:{
        targetKeys:nextTargetKeys,
        direction,
        moveKeys,
        organizationId:this.state.agencyId,
        type:this.state.resourceTabKey,
      }
    });
  }
  /* 分配资源查询 */
  handleResourceSearch = (fieldsValue) => {
    const { dispatch } = this.props;
    
    dispatch({
      type:'agency/resource',
      payload:{
        organizationId:this.state.agencyId,
        type:this.state.resourceTabKey,
        ...fieldsValue
      }
    })
  }

  render() {
    const { resourceModalVisible, 
            dataSource,
            resourceTabKey,
    } = this.state;
    const { 
      agency: { info, resourceData, resourceTargetKeys },
    } = this.props;
    const contentList = {
      1: (
        <Table
          pagination={false}
          loading={loading}
          dataSource={null}
          columns={columns}
        />
      ),
      2: (
        <Table
          pagination={false}
          loading={loading}
          dataSource={null}
          columns={columns}
        />
      ),
      3: (
        <Table
          pagination={false}
          loading={loading}
          dataSource={null}
          columns={columns}
        />
      ),
      4: (
        <Table
          pagination={false}
          loading={loading}
          dataSource={null}
          columns={columns}
        />
      ),
      5: (
        <Table
          pagination={false}
          loading={loading}
          dataSource={null}
          columns={columns}
        />
      ),
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
      handleSelectResourceChange:this.handleSelectResourceChange,
      handleResourceChange:this.handleResourceChange,
      handleSourceSearch:this.handleSourceSearch,
      handleResourceSearch:this.handleResourceSearch,
      resourceTabKey:resourceTabKey,
      dataSource:dataSource,
      resourceData:resourceData,
      resourceTargetKeys:resourceTargetKeys,

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
        
        {/* <Card title="客户信息" style={{ marginBottom: 24 }} bordered={false}>
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
        </Card> */}
        
        <Card
          style={{ marginBottom: 24 }}
          className={styles.tabsCard}
          bordered={false}
          tabList={classifyTabList}
          onTabChange={this.onOperationTabChange}
        >
          {/* {contentList[resourceTabKey]} */}
        </Card>
        {/* <Card title="客户近半年购买记录" style={{ marginBottom: 24 }} bordered={false}>
          <div className={styles.noData}>
            <Icon type="frown-o" />
            暂无数据
          </div>
        </Card> */}
        <EditResource modalVisible={resourceModalVisible} {...resourceProps}/>
      </PageHeaderWrapper>
      
    );
  }
}

export default AgencyInfo;
