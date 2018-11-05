import React, { PureComponent,Fragment } from 'react';
import { FormattedNumber } from 'react-intl'
import StandardTable from '@/components/StandardTable';
import { formatMessage } from 'umi/locale';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { connect } from 'dva';
import Link from 'umi/link';
import { 
  Card,
  Button,
  Form,
  Menu,
  Dropdown,
  Icon,
  Divider,
  Radio,
  Modal,
  Input,
  Cascader,
  Select,
  Switch,
  InputNumber,
  Upload,
  Badge,
  message,
  Alert,
  Row,
  Col,
} from 'antd';
import styles from './Index.less';

const FormItem = Form.Item;
const Option = Select.Option;
const statusMap = [ 'error','success'];
const status = ["未发布","已发布"];

@Form.create()
class UpdateForm extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      id: props.editId,
    };

    this.formLayout = {
      labelCol: { span: 7 },
      wrapperCol: { span: 13 },
    };
  }
  updateOkHandle = () => {
    const { form,handleUpdate} = this.props;
  
    form.validateFields((err,fieldsValue) => {
      if (err) return;
      handleUpdate(fieldsValue);
    });
  };
  
  
  render() {
    const { form, updateModalVisible, handleUpdateModalVisible, handleUploadChange,
            imageUrl, classify, tags, handleTypeChange } = this.props;
    
    function onChange(value, selectedOptions) {
      //console.log(value, selectedOptions);
    }
    
    function filter(inputValue, path) {
      return (path.some(option => (option.label).toLowerCase().indexOf(inputValue.toLowerCase()) > -1));
    }

    
    function handleChange(value) {
      // console.log(`selected ${value}`);
    }
    
    
    
    return (
      <Modal
        width={640}
        bodyStyle={{ padding: '32px 40px 48px' }}
        destroyOnClose
        title="完善"
        visible={updateModalVisible}
        onCancel={() => handleUpdateModalVisible()}
        onOk={() => this.updateOkHandle()}
        >
       
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="类型">
          {form.getFieldDecorator('type', {
            initialValue:3,
            valuePropName:'check',
          })(
            <Radio.Group defaultValue="3" buttonStyle="solid" onChange={handleTypeChange}>
              <Radio.Button value="3">海外教材</Radio.Button>
              <Radio.Button value="4">阅读世界</Radio.Button>
            </Radio.Group>
          )}
        </FormItem>
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="分类">
          {form.getFieldDecorator('threeClassifyId', {
            rules: [
              { 
                required: true, 
                message: '请选择分类'
              }
            ],
          })(<Cascader 
              style={{width:'100%'}}
              options={classify}     
              onChange={onChange}
              placeholder="请选择分类" 
              showSearch={{ filter }}
              />)}
        </FormItem>
       
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="标签">
          {form.getFieldDecorator('tags', {
            rules: [
              { 
                required: true, 
                message: '是否有音频'
              }
            ],
          })(<Select
                mode="multiple"
                style={{ width: '100%' }}
                placeholder="选择标签"
                onChange={handleChange}
              >
                {tags.map(item => <Option key={item.id}>{item.name}</Option>)}
              </Select>)}
        </FormItem>
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="商城URL">
          {form.getFieldDecorator('shoppingUrl', {
            rules: [
              
              {
                type:'url',
                message: 'URL格式不正确'
              }
            ],
          })(<Input />)}
        </FormItem>
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="蓝思值">
          {form.getFieldDecorator('lexile')(<InputNumber style={{width:'50%'}} />)}
        </FormItem>
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="促销价格">
          {form.getFieldDecorator('price')(<InputNumber min={0.01} precision={2} max={99999} style={{width:'50%'}}/>)}
        </FormItem>
      </Modal>
      
    );
    
  }
}

@connect(({ global,material,loading }) => ({
  global,
  material,
  loading: loading.models.material,
}))
@Form.create()
export default class MaterialList extends React.Component{
  state = {
    selectedRows: [],
    updateModalVisible:false,
    perfectModalVisible:false,
  }
  
  columns = [
    {
      title: 'ISBN',
      dataIndex: 'isbn',
    },
    {
      title: '标题',
      dataIndex: 'title',
    },
    {
      title: '作者',
      dataIndex: 'author',
    },
    {
      title: '出版社',
      dataIndex: 'publisher',
    },
    {
      title: '价格',
      dataIndex: 'listprice',
      render(val){
        return <FormattedNumber value={val} style="currency" currency="CNY"></FormattedNumber>
      }
    },
    {
      title: '状态',
      dataIndex: 'status',
      filters: [
        {
          text: status[0],
          value: 0,
        },
        {
          text: status[1],
          value: 1,
        },
      ],
      render(val) {
        return <Badge status={statusMap[val]} text={status[val]} />;
      },
    },
    {
      title: '操作',
      render: (text,record) => (
        <Fragment>
          { !record.type && <a onClick={() => this.handleUpdateModalVisible(true,record)}>完善</a> }
          { record.type && <a onClick={() => this.handleUpdateModalVisible(true,record)}>编辑</a> }
          <Divider type="vertical" />
          <Link to={`/material/info/${record.key}`}>详细</Link>
        </Fragment>
        
      ),
    }
  ]
  
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'material/fetch',
      payload: {},
    });
    dispatch({
      type: 'global/getClassify',
      payload: { type:3 },
    });
    dispatch({
      type: 'global/getTags',
  
    });
  }
  //列表选择事件
  handleSelectRows = rows => {
    this.setState({
      selectedRows: rows,
    });
  };
  handleTableReset = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'material/fetch',
    });
  }
  handleUpdateModalVisible = (flag, record) => {  
    let key = {};
    if(flag){
      key = record.key 
    }
    this.setState({
      updateModalVisible: !!flag,
      editId:key,
    });
  };
  handlePerfectModalVisible = (flag) => {
    this.setState({
      perfectModalVisible: !!flag,
    });
  }

  handleUpdate = fields => {
    const { dispatch } = this.props;
    dispatch({
      type: 'material/update',
      payload: {
        ...fields
      },
      callback: (_ = res => {
        if(res.success){
          message.success("已完善");
          this.handleTableReset();
          
        }else{
          message.error(res.msg);
        }
      }),
    });
    this.handleUpdateModalVisible();
  };

  handleUploadChange = (info) => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      this.setState({
        fileKey:info.file.response.key,
      });
      getBase64(info.file.originFileObj, imageUrl => this.setState({
        imageUrl,
        loading: false,
      }));
    }
  }
  handleTypeChange = (e) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'global/getClassify',
      payload: { type:e.target.value },
    });
  }
  handlePutaway = () => {
    const { selectedRows } = this.state;
    Modal.confirm({
      title: '上架',
      content: `确认上架选择的${selectedRows.length}项吗？`,
      centered:true,
      onOk: () => {
        const { dispatch } = this.props;
        dispatch({
          type: 'material/putaway',
          payload: {
            key: selectedRows.map(row => row.key)
          },
          callback: (_ = res =>{
            if(res.success){
              message.success('上架成功');
              this.handleTableReset();
            }else{
              message.error(res.msg);
            }
            this.setState({
              selectedRows: [],
            });
          })
        });
      }
    });
  }
  
  handleSoldout = () => {
    const { selectedRows } = this.state;
    Modal.confirm({
      title: '下架',
      content: `确认下架选择的${selectedRows.length}项吗？`,
      centered:true,
      onOk: () => {
        const { dispatch } = this.props;
        dispatch({
          type: 'material/soldout',
          payload: {
            key: selectedRows.map(row => row.key)
          },
          callback: (_ = res =>{
            if(res.success){
              message.success('下架成功');
              this.handleTableReset();
            }else{
              message.error(res.msg);
            }
            this.setState({
              selectedRows: [],
            });
          })
        });
      }
    });
  }
  renderForm () {
    const {
      form: { getFieldDecorator },
    } = this.props;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 3 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 },
      },
      colon:false,
    };
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem {...formItemLayout} label="类型">
              {getFieldDecorator('type')(
                <Select allowClear={true} style={{ width: '100%' }}>
                <Option value="3">海外教材</Option>
                <Option value="4">阅读世界</Option>
              </Select>
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem {...formItemLayout} label="教材状态">
              {getFieldDecorator('title')(
                <Select allowClear={true} style={{ width: '100%' }}>
                  <Option value="1">已发布</Option>
                  <Option value="0">未发布</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem {...formItemLayout} label="作者">
              {getFieldDecorator('name')(
                <Input style={{ width: '100%' }} />
              )}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem {...formItemLayout} label="ISBN">
              {getFieldDecorator('isbn')(
                <Input style={{ width: '100%' }}  />
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem {...formItemLayout} label="教材名称">
              {getFieldDecorator('title')(
                 <Input style={{ width: '100%' }}  />
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem {...formItemLayout} label="出版社">
              {getFieldDecorator('name')(
                <Input style={{ width: '100%' }} />
              )}
            </FormItem>
          </Col>
        </Row>
        <div style={{ overflow: 'hidden' }}>
          <div style={{ float: 'right', marginBottom: 24 }}>
            <Button type="primary" htmlType="submit">
              {formatMessage({id: 'app.search'})}
            </Button>
            <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
            {formatMessage({id: 'app.reset'})}
            </Button>
            
          </div>
        </div>
      </Form>
    );
  }

  render(){
    const {
      global: { classify,tags },
      material: { data },
      loading,
      form,
    } = this.props;
   
    const { selectedRows,updateModalVisible,editId,perfectModalVisible } = this.state;
    const menu = (
      <Menu>
        <Menu.Item onClick={this.handleSoldout} key="down">下架</Menu.Item>
      </Menu>
    );
    const updateMethods = {
      handleUpdateModalVisible: this.handleUpdateModalVisible,
      handleUpdate: this.handleUpdate,
      handleUploadChange:this.handleUploadChange,
      imageUrl:this.state.imageUrl,
      classify:classify,
      tags:tags,
      handleTypeChange:this.handleTypeChange,
    };
    const beforeUpload = file => {
      const isJPG = file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
      if (!isJPG) {
        message.error('你只能上传.xlsx文件！');
      }
      const isLt2M = file.size / 1024 / 1024 < 20;
      if (!isLt2M) {
        message.error('Excel必须小于20MB！');
      }
      return isJPG && isLt2M;
    }
    return(
      <PageHeaderWrapper>
        <Card>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>{this.renderForm()}</div>
            <div className={styles.tableListOperator}>
            <Button icon="edit" type="primary" onClick={() => this.handlePerfectModalVisible(true)}>
              批量完善
            </Button>
            {selectedRows.length > 0 && (
              <span>
                <Button onClick={this.handlePutaway}>上架</Button>
                <Dropdown overlay={menu}>
                  <Button>
                  更多<Icon type="down" />
                  </Button>
                </Dropdown>
              </span>
            )}
            </div>
            <StandardTable
              selectedRows={selectedRows}
              data={data}
              loading={loading}
              columns={this.columns}
              onSelectRow={this.handleSelectRows}
            />
          </div>
        </Card>
        <UpdateForm
          {...updateMethods}
          updateModalVisible={updateModalVisible}
          editId={editId}
        />
        <Modal
          width={640}
          bodyStyle={{ padding: '32px 40px 48px' }}
          destroyOnClose
          title="批量完善"
          onCancel={() => this.handlePerfectModalVisible()}
          //onOk={() => this.updateOkHandle()}
          footer={null}
          visible={perfectModalVisible}
        >
     
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="模板文件">
              <a><Icon type="download" theme="outlined" />下载模板</a>
        </FormItem>

        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="Excel文件">
          {form.getFieldDecorator('price', {
            rules: [
              { 
                required: true, 
                message: '请上传Excel'
              }
            ],
          })(<Upload 
              name= 'file'
              action= '//upload.qiniup.com'
              showUploadList={false}
              beforeUpload={beforeUpload}
              >
                <Button>
                  <Icon type="upload" /> 上传Excel 
                </Button>
            </Upload>)}
        </FormItem>
        <Alert
          message="上传成功"
          description="已完善成功教材107册，失败10册"
          type="success"
          showIcon
        />
        {/* <Alert
          message="提示"
          description="需按照模板格式要求组织数据."
          type="info"
          showIcon
        /> */}
        </Modal>
      </PageHeaderWrapper>
    ) 
  }
}