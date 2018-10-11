import React,{PureComponent, Fragment} from 'react';
import moment from 'moment';
import { connect } from 'dva';
import StandardTable from '@/components/StandardTable';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { 
  Button,
  Card, 
  Divider,
  Input,
  Form,
  Modal,
  InputNumber,
  Upload,
  Icon,
  DatePicker,
  message,
  Select,
} from 'antd';
import Link from 'umi/link';
import { getBase64 } from '@/utils/utils';
import styles from './List.less';

const FormItem = Form.Item;
const { TextArea } = Input;
const { RangePicker } = DatePicker;

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

const CreateForm = Form.create()(props => {
  const { form,modalVisible,handleModalVisible,handleAdd,handleUploadChange,imageUrl } = props;
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      handleAdd(fieldsValue);
    });
  };

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
            }
          ]
        })(<Input placeholder="请输入机构名称"/>)}
      </FormItem>
      <FormItem {...formItemLayout} label="机构编号">
        {form.getFieldDecorator('code',{
          rules: [
            {
              required: true,
              message: '请输入机构编号'
            }
          ]
        })(<Input placeholder="请输入机构编号"/>)}
      </FormItem>
      <FormItem {...formItemLayout} label="教师数量">
        {form.getFieldDecorator('teacherNum',{
          rules: [
            {
              required: true,
              message: '请输入教师数量'
            }
          ]
        })(<InputNumber min={1} placeholder="数量"/>)}
      </FormItem>
      <FormItem {...formItemLayout} label="学生数量">
        {form.getFieldDecorator('studentNum',{
          rules: [
            {
              required: true,
              message: '请输入学生数量'
            }
          ]
        })(<InputNumber min={1} placeholder="数量" />)}
      </FormItem>
      <FormItem {...formItemLayout} label="销售人员">
        {form.getFieldDecorator('salesman',{
          rules: [
            {
              required: true,
              message: '请选择销售人员'
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
export default class AgencyList extends PureComponent{
  state = {
    selectedRows: [],
    modalVisible: false,
    uploading: false,
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
      title: '描述',
      dataIndex: 'description',
    },
    {
      title: '操作',
      render: (text,record) => (
        <Fragment>
          <a>编辑</a>
          <Divider type="vertical" />
          {/* <a>详细</a> */}
          <Link to="/agency/info">详细</Link>
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
    
  handleModalVisible = flag => {
    this.setState({
      modalVisible: !!flag,
      imageUrl:null,
    });
  };  
  handleAdd = fields => {
    const { dispatch } = this.props;
    // const { fileKey } = this.state;
    // const formVals = { ...fields, fileKey };
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
  render(){
    const {
      agency: { data },
      loading,
    } = this.props;
    const { selectedRows,modalVisible,imageUrl } = this.state;
    const parentMethods = {
      handleAdd: this.handleAdd,
      handleModalVisible: this.handleModalVisible,
      handleUploadChange: this.handleUploadChange,
      imageUrl:imageUrl,
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
            </div>
            <StandardTable
              selectedRows={selectedRows}
              data={data}
              loading={loading}
              columns={this.columns}
            />
          </div>
        </Card>
        <CreateForm modalVisible={modalVisible} {...parentMethods}/>      
      </PageHeaderWrapper>
        
    ) 
  }
}