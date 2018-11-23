import React, { PureComponent,Fragment } from 'react';
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
  Select,
  InputNumber,
  Upload,
  Badge,
  message,
  Alert,
  Row,
  Col,
} from 'antd';
import { FormattedNumber } from 'react-intl'
import { formatMessage } from 'umi/locale';
import Link from 'umi/link';
import { connect } from 'dva';
import StandardTable from '@/components/StandardTable';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import Tag from '@/components/BusinessData/Tag';
import Classify from '@/components/BusinessData/Classify';
import { getAuthority } from '@/utils/authority';
import { status, statusMap } from '@/constants'


import styles from './Index.less';

const FormItem = Form.Item;
const { Option } = Select;

// 编辑组件
@Form.create()
class UpdateForm extends PureComponent {
  constructor(props) {
    super(props);

    
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
    const { 
      form, 
      updateModalVisible, 
      handleUpdateModalVisible, 
      handleTypeChange, 
      values,
      isReading 
    } = this.props;

    
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
        <Form hideRequiredMark>
          <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="类型">
            {form.getFieldDecorator('type', { 
              initialValue:values.type,
              valuePropName:'check',
            })(
              <Radio.Group defaultValue={values.type} buttonStyle="solid" onChange={handleTypeChange}>
                <Radio.Button value={3}>海外教材</Radio.Button>
                <Radio.Button value={4}>阅读世界</Radio.Button>
              </Radio.Group>
            )}
          </FormItem>
          <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="分类">
            {form.getFieldDecorator('classifyIds', {
              initialValue:values.classifyIds,
              rules: [
                { 
                  required: true, 
                  message: '请选择分类'
                }
              ],
            })(<Classify isReading={isReading} />)}
          </FormItem>
        
          <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="标签">
            {form.getFieldDecorator('tagsIds', {
              initialValue:values.tagsIds,
              rules: [
                { 
                  required: true, 
                  message: '请选择标签'
                }
              ],
            })(<Tag />)}
          </FormItem>
          <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="商城URL">
            {form.getFieldDecorator('shoppingUrl', {
              initialValue:values.shoppingUrl,
              rules: [
                
                {
                  type:'url',
                  message: 'URL格式不正确'
                }
              ],
            })(<Input />)}
          </FormItem>
          <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="蓝思值">
            {form.getFieldDecorator('lexile',{initialValue:values.lexile,})(<InputNumber style={{width:'50%'}} />)}
          </FormItem>
          <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="促销价格">
            {form.getFieldDecorator('price',{initialValue:values.price,})(<InputNumber min={0} precision={2} max={99999} style={{width:'50%'}} />)}
          </FormItem>
        </Form>
      </Modal>
      
    );
    
  }
}
/* eslint-disable */
@connect(({ global,material,loading }) => ({
  global,
  material,
  loading: loading.models.material,
}))

@Form.create()
class MaterialList extends React.Component{
  state = {
    selectedRows: [],
    updateModalVisible:false,
    perfectModalVisible:false,
    uploadMsgType:'warning',
    uploadMsgTitle:'注意事项',
    uploadMsg:'需按照模板格式要求组织数据.',
    isReading:false,
  }
  // table 列名
  columns = [
    {
      title: 'ISBN',
      dataIndex: 'isbn',
    },
    {
      title: '标题',
      dataIndex: 'title',
    },
    // {
    //   title: '作者',
    //   dataIndex: 'author',
    // },
    // {
    //   title: '出版社',
    //   dataIndex: 'publisher',
    // },
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
      type: 'global/getTags',
  
    });
  }
  // 条件查询
  handleSearch = e => {
    e.preventDefault();

    const { dispatch, form } = this.props;

    form.validateFields((err, fieldsValue) => {
      if (err) return;
      dispatch({
        type: 'material/fetch',
        payload: fieldsValue,
      });
    });
  };

  // 重置查询表单
  handleFormReset = () => {
    const { form, dispatch } = this.props;
    form.resetFields();
    dispatch({
      type: 'material/fetch',
      payload: {},
    });
  };

  // 列表批量选择事件
  handleSelectRows = rows => {
    this.setState({
      selectedRows: rows,
    });
  };
  
  // 刷新table
  handleTableReset = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'material/fetch',
    });
  }

  //编辑弹出框
  handleUpdateModalVisible = (flag, record) => {  
    const { dispatch, form } = this.props;
    let key = null;
    this.setState({
      FormValues:{},
    });
    if(flag){
      key = record.key 
      dispatch({
        type: 'material/editInfo',
        payload:key,
        callback:(_ = res =>{
          this.setState({
            FormValues:res.data,
          });
        })
      })
     
    }
    this.setState({
      updateModalVisible: !!flag,
      editId:key,
    });
  };

  // 导入Excel批量完善
  handlePerfectModalVisible = (flag) => {
    this.setState({
      perfectModalVisible: !!flag,
    });
  }

  // 编辑完善
  handleUpdate = fields => {
    const { dispatch } = this.props;
    const { editId} = this.state;
    const values = {
      ...fields,
      id:editId,
    };
    dispatch({
      type: 'material/update',
      payload: {
        ...values
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
  
  //类别更改修改分类数据
  handleTypeChange = (e) => {
    const { dispatch, isReading } = this.props;
    
    this.setState({
      isReading: e.target.value == 4
    })
  }
  //上架
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
  //下架
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
  //查询表单渲染
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
              {getFieldDecorator('status')(
                <Select allowClear={true} style={{ width: '100%' }}>
                  <Option value="1">已发布</Option>
                  <Option value="0">未发布</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem {...formItemLayout} label="作者">
              {getFieldDecorator('author')(
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
              {getFieldDecorator('publisher')(
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
  //文件上传后处理事件
  handleUploadChange = (info) => {
    if (info.file.status === 'uploading') {
      //this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
        const uploadMsgType = info.file.response.success ? 'success':'error';
        const uploadMsgTitle = info.file.response.success ? '上传完成':'错误';

        this.setState({
          uploadMsgType,
          uploadMsgTitle,
          uploadMsg:info.file.response.msg,
        })
      
      this.setState({
        upMsg:info.file.response.data,
      });
      
    }
  }
  render(){
    const {
      global: { classify, tags },
      material: { data },
      loading,
      form,
    } = this.props;
   
    const { 
      selectedRows, 
      updateModalVisible, 
      editId, 
      perfectModalVisible, 
      FormValues,
      isReading 
    } = this.state;
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
      isReading:isReading,
    };
    const token = getAuthority('token');
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
        {FormValues && Object.keys(FormValues).length ? (
        <UpdateForm
          {...updateMethods}
          updateModalVisible={updateModalVisible}
          editId={editId}
          values={FormValues}
        />
        ) : null}
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
              <a href="https://static.cnpeducation.com/BookTemplate.xlsx"><Icon type="download" theme="outlined" />下载模板</a>
        </FormItem>

        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="Excel文件">
         <Upload 
              name= 'file'
              action= '/api/textbook/batchperfectinfo'
              showUploadList={false}
              beforeUpload={beforeUpload}
              onChange={this.handleUploadChange}
              headers={
                {'Authorization':`Bearer ${token}`}
              }
            >
            <Button>
              <Icon type="upload" /> 上传Excel 
            </Button>
          </Upload>
        </FormItem>
        <Alert
          message={this.state.uploadMsgTitle}
          description={this.state.uploadMsg}
          type={this.state.uploadMsgType}
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

export default MaterialList;