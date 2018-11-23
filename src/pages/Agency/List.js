import React,{PureComponent, Fragment} from 'react';
import moment from 'moment';
import { connect } from 'dva';
import StandardTable from '@/components/StandardTable';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { 
  Button,
  Card, 
  Input,
  Form,
  Modal,
  InputNumber,
  Upload,
  Icon,
  DatePicker,
  message,
  Menu,
} from 'antd';
import Link from 'umi/link';
import { getBase64 } from '@/utils/utils';
import styles from './List.less';

const FormItem = Form.Item;
const { TextArea } = Input;
const { RangePicker } = DatePicker;

//Modal 布局
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 5 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 15 },
  },
  colon:false,
};
//新增机构组件
const CreateForm = Form.create()(props => {
  const { form,modalVisible,handleModalVisible,handleAdd,handleUploadChange,imageUrl,qiniuToken } = props;
  //确认按钮
  const data = {
    token: qiniuToken
  }
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      handleAdd(fieldsValue);
    });
  };
  //上传按钮
  const uploadButton = (
    <div>
      <Icon type="plus" />
      <div className="ant-upload-text">上传</div>
    </div>
  );
  
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
  return(
    <Modal
      destroyOnClose
      title="创建机构"
      okText="创建"
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => handleModalVisible()}
    >
      <FormItem {...formItemLayout} label="机构名称">
        {form.getFieldDecorator('name',{
          rules: [
            {
              required: true,
              message: '请输入机构名称'
            },
            {
              min:2,
              max:20,
              message:'必须为2-20位'
            }
          ]
        })(<Input placeholder="请输入机构名称" />)}
      </FormItem>
      <FormItem {...formItemLayout} label="机构编号">
        {form.getFieldDecorator('code',{
          rules: [
            {
              required: true,
              message: '请输入机构编号'
            },
            {
              max:8,
              message:'必须为1-8位'
            },
        
          ]
        })(<Input placeholder="请输入机构编号" />)}
      </FormItem>
      <FormItem {...formItemLayout} label="教师数量">
        {form.getFieldDecorator('teacherNum',{
          rules: [
            {
              required: true,
              message: '请输入教师数量'
            }
          ]
        })(<InputNumber min={1} max={9999} placeholder="数量"/>)}
      </FormItem>
      <FormItem {...formItemLayout} label="学生数量">
        {form.getFieldDecorator('studentNum',{
          rules: [
            {
              required: true,
              message: '请输入学生数量'
            }
          ]
        })(<InputNumber min={1} max={9999} placeholder="数量" />)}
      </FormItem>
      <FormItem {...formItemLayout} label="销售人员">
        {form.getFieldDecorator('salesman',{
          rules: [
            {
              required: true,
              message: '请选择销售人员'
            },
            {
              max:10,
              message:'长度不能超过10位'
            }
          ]
        })( <Input/>)}
      </FormItem>
      <FormItem {...formItemLayout} label="机构Logo">
        {form.getFieldDecorator('logo',{
          rules: [
            {
              required: true,
              message: ''
            }
          ]
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
      <FormItem {...formItemLayout} label="服务期限">
        {form.getFieldDecorator('date',{
          rules: [
            {
              required: true,
              message: '请选择服务期限'
            }
          ]
        })(<RangePicker/>)}
      </FormItem>
      <FormItem {...formItemLayout} label="机构描述">
        {form.getFieldDecorator('description',{
          rules: [
            {
              required: true,
              message: '请输机构描述'
            },
            {
              max:500,
              message:'长度不能超过500位'
            }
          ]
        })(<TextArea rows={4} />)}
      </FormItem>
    </Modal>
  )
})



/* eslint react/no-multi-comp:0 */
@connect(({ agency,loading }) => ({
    agency,
    loading: loading.models.users,
}))
@Form.create()
class AgencyList extends PureComponent{
  state = {
    selectedRows: [],
    modalVisible: false,
    loading: false,
  }

  columns = [
    {
      title: '名称',
      dataIndex: 'name',
    },
    {
      title: '编号',
      dataIndex: 'code',
    },
    {
      title: '销售员',
      dataIndex: 'salesman',
    },
    {
      title: '开始日期',
      dataIndex: 'startDate',
      sorter: true,
      render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>
    },
    {
      title: '结束日期',
      dataIndex: 'endDate',
      sorter: true,
      render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>
    },
    {
      title: '操作',
      render: (text,record) => (
        <Fragment>
          <Link to={`/agency/info/${record.key}`}>详情</Link>
        </Fragment>
      ),
    }
  ]
  
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'agency/fetch',
      payload: {},
    });
  }
  //显示隐藏机构新增Modal
  handleModalVisible = flag => {
    if(flag){
      const { dispatch } = this.props;
      dispatch({
        type: 'global/getQiniuToekn',
        callback: _ = res => {
          this.setState({
            qiniuToken: res.data.token
          })
        }
      });
    }
    this.setState({
      modalVisible: !!flag,
      imageUrl:null,
    });
  };  
  //机构新增
  handleAdd = fields => {
    const { dispatch } = this.props;
    dispatch({
      type: 'agency/add',
      payload: {
        ...fields,
      },
      callback: (_ = res => {
        if(res.success){
          message.success("添加成功");
          this.handleFormReset();
        }else{
          message.error(res.msg);
        }
      }),
    });
    this.handleModalVisible();
  };
  //重置表单及刷新列表
  handleFormReset = () => {
    const { form, dispatch } = this.props;
    form.resetFields();
    this.setState({
      formValues: {},
    });
    dispatch({
      type: 'agency/fetch',
      payload: {},
    });
  };
  //上传LOGO变更事件
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
  //列表选择事件
  handleSelectRows = rows => {
    this.setState({
      selectedRows: rows,
    });
  };
  //更多菜单事件
  handleMenuClick = e => {
    switch (e.key) {
      case 'more':
        break;
      default:
        break;
    }
  };
  //删除机构
  handleDelete = () => {
    const { selectedRows } = this.state;
    Modal.confirm({
      title: '删除机构',
      content: `确认删除选择的${selectedRows.length}个机构吗?`,
      centered:true,
      onOk: () => {
        const { dispatch } = this.props;
        if (!selectedRows) return;
        dispatch({
          type: 'agency/remove',
          payload: {
            key: selectedRows.map(row => row.key),
          },
          callback: ( _ = res => {
            if(res.success){
              message.success('删除机构成功');
              this.handleFormReset();
            }else{
              message.error(res.msg);
            }
            this.setState({
              selectedRows: [],
            });
          }),
        });
      },
    });
    

  }
  render(){
    const {
      agency: { data },
      loading,
    } = this.props;
    const { selectedRows,modalVisible,imageUrl,qiniuToken } = this.state;
    const menu = (
      <Menu onClick={this.handleMenuClick} selectedKeys={[]}>
        <Menu.Item key="more">更多</Menu.Item>
      </Menu>
    );
   
    const parentMethods = {
      handleAdd: this.handleAdd,
      handleModalVisible: this.handleModalVisible,
      handleUploadChange: this.handleUploadChange,
      imageUrl:imageUrl,
      qiniuToken:qiniuToken,
    };
    return(
      <PageHeaderWrapper>
        <Card>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}></div>
            <div className={styles.tableListOperator}>
            <Button icon="plus" type="primary" onClick={() => this.handleModalVisible(true)}>
              新建机构
            </Button>
            {selectedRows.length > 0 && (
              <span>
                <Button onClick={this.handleDelete}>删除</Button>
                {/* <Dropdown overlay={menu}>
                  <Button>
                  更多<Icon type="down" />
                  </Button>
                </Dropdown> */}
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
        <CreateForm modalVisible={modalVisible} {...parentMethods}/>      
      </PageHeaderWrapper>
        
    ) 
  }
}

export default AgencyList