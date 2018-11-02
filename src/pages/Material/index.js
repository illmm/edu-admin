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
} from 'antd';
import styles from './index.less';

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
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">上传</div>
      </div>
    );
    const data = {
      token:'3szjMYDo-XNVHEhC286FNpKeLLHyGn916Bo8NcnV:puRbfwz_NMTLM4_6ejNwlxpvc0g=:eyJzY29wZSI6InN0YXRpYyIsImRlYWRsaW5lIjoxNTM5MjUwNjAyfQ=='
    }
    const beforeUpload = file => {
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/png' ;
      if (!isJPG) {
        message.error('你只能上传JPG,PNG文件！');
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        message.error('图像必须小于2MB！');
      }
      return isJPG && isLt2M;
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
            valuePropName:'check',
            rules: [
              { 
                required: true, 
                message: '请选择类型'
              }
            ],
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
          {form.getFieldDecorator('isVoice', {
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
                required: true, 
                message: '请输入商城URL'
              },
              {
                type:'url',
                message: 'URL格式不正确'
              }
            ],
          })(<Input />)}
        </FormItem>
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="蓝思值">
          {form.getFieldDecorator('lexile', {
            rules: [
              { 
                required: true, 
                message: '请输入蓝思值'
              }
            ],
          })(<InputNumber style={{width:'50%'}} />)}
        </FormItem>
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="促销价格">
          {form.getFieldDecorator('price', {
            rules: [
              { 
                required: true, 
                message: '请输入促销价格'
              }
            ],
          })(<InputNumber min={0.01} max={99999} style={{width:'50%'}}/>)}
        </FormItem>
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="封面">
          {form.getFieldDecorator('logo', {
            rules: [
              { 
                required: true, 
                message: '请选择封面'
              }
            ],
          })( <Upload
            name="avatar"
            listType="picture-card"
            className={styles.uploadImage}
            showUploadList={false}
            action="//upload.qiniup.com"
            beforeUpload={beforeUpload}
            onChange={handleUploadChange}
            name="file"
            data={data}
          >
            {imageUrl ? <img src={imageUrl} className={styles.uploadImage} alt="avatar" /> : uploadButton}
          </Upload>)}
        </FormItem>
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="状态">
          {form.getFieldDecorator('status', {
            rules: [
              { 
                required: true, 
                message: '状态'
              }
            ],
          })( <Switch checkedChildren="上架" unCheckedChildren="下架" defaultChecked />)}
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
          <a onClick={() => this.handleUpdateModalVisible(true,record)}>完善</a>
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

  handleUpdate = fields => {
    const { dispatch } = this.props;
    dispatch({
      type: 'users/update',
      payload: {
        ...fields
      },
      callback: (_ = res => {
        if(res.success){
          message.success(formatMessage({id:'app.authority.user.msg.success'}));
          this.handleFormReset();
          
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
              this.handleFormReset();
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
              this.handleFormReset();
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

  render(){
    const {
      global: { classify,tags },
      material: { data },
      loading,
    } = this.props;
   
    const { selectedRows,updateModalVisible,editId } = this.state;
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
    return(
      <PageHeaderWrapper>
        <Card>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}></div>
            <div className={styles.tableListOperator}>
            <Button icon="plus" type="primary" onClick={() => this.handleModalVisible(true)}>
              导入信息
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
      </PageHeaderWrapper>
    ) 
  }
}