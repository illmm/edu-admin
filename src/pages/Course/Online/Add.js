import React, { PureComponent } from 'react';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import BraftEditor from 'braft-editor';
import { getBase64 } from '@/utils/utils';
import { connect } from 'dva';
import { 
  Card,
  Form,
  Input,
  Select,
  Cascader,
  InputNumber,
  Button,
  Upload,
  message,
  Icon,
 } from 'antd';

import 'braft-editor/dist/index.css';
import styles from './Styles.less';

const FormItem = Form.Item;
const { Option } = Select;

@connect(({ global,loading }) => ({
  global,
  loading: loading.effects['global/getClassify'],
}))

@Form.create()
class AddOnlineCourse extends PureComponent{

  state = {
    uploadLoading: false,
    qiniuToken:'',
  }
  
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'global/getClassify',
      payload: { type:3 },
    });
    dispatch({
      type: 'global/getTags',
    });
    dispatch({
      type: 'global/source',
    });
   
    dispatch({
      type: 'global/getQiniuToekn',
      callback: res => {
        this.setState({
          qiniuToken: res.data.token
        })
      }
    });
  }
  
  handleSubmit = e => {
    const { dispatch, form } = this.props;
    e.preventDefault();

    form.validateFieldsAndScroll((err, values) => {
      if(!err){
        values.key = values.image.file.response.key;
        delete values.image;
        dispatch({
          type: 'course/add',
          payload: values,
        });
      }
    });

  }

  handleUploadChange = (info) => {
    if (info.file.status === 'uploading') {
      this.setState({ uploadLoading: true });
      return;
    }
    if (info.file.status === 'done') {
      this.setState({
        // eslint-disable-next-line
        fileKey:info.file.response.key,
      });
      getBase64(info.file.originFileObj, imageUrl => this.setState({
        imageUrl,
        uploadLoading: false,
      }));
    }
  }

  render(){
    const {
      form: { getFieldDecorator, getFieldValue },
      global: { classify, tags, source },
    } = this.props;

    const { uploadLoading, imageUrl, qiniuToken } = this.state;
    const data = {
      token: qiniuToken
    }
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 3 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 21 },
      },
    };
    const submitFormLayout = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 10, offset: 7 },
      },
    };
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

    function filter(inputValue, path) {
      return (path.some(option => (option.label).toLowerCase().indexOf(inputValue.toLowerCase()) > -1));
    }
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">上传</div>
      </div>
    );
    
    return(
      <PageHeaderWrapper>
        
        <Card bordered={false}>
          <Form onSubmit={this.handleSubmit} hideRequiredMark style={{ marginTop: 8 }}>
            <FormItem {...formItemLayout} label="标题">
              {getFieldDecorator('title',{
                rules: [
                  {
                    required: true,
                    message:'请输入课程名称'
                  }, 
                ],
                initialValue: '1',
              })( 
                <Select style={{width:300}}>
                  <Option value="1">课程1</Option> 
                  <Option value="2">课程2</Option> 
                </Select>)}
            </FormItem>
            <FormItem {...formItemLayout} label="分类">
              {getFieldDecorator('classify')
              (<Cascader 
               
                style={{width:300}}
                options={classify}     
                placeholder="请选择分类" 
                showSearch={{ filter }}
              />)}
            </FormItem>
            <FormItem {...formItemLayout} label="标签">
              {getFieldDecorator('tags')
              (
                <Select
                  
                  mode="multiple"
                  style={{width:300}}
                  placeholder="选择标签"
                >
                  {tags.map(item => <Option key={item.id}>{item.name}</Option>)}
                </Select>)}
            </FormItem>
            <FormItem {...formItemLayout} label="来源">
              {getFieldDecorator('source_id')
              (
                <Select
                  style={{width:300}}
                  placeholder="选择来源"
                >
                  {source.map(item => <Option key={item.id}>{item.name}</Option>)}
                </Select>)}
            </FormItem>
            <FormItem {...formItemLayout} label="图片">
              {getFieldDecorator('image')
              (
                <Upload
                  listType="picture-card"
                  className={styles.uploadImage}
                  showUploadList={false}
                  action="//upload.qiniup.com"
                  beforeUpload={beforeUpload}
                  loading={uploadLoading}
                  onChange={this.handleUploadChange}
                  name="file"
                  data={data}
                >
                  {imageUrl ? <img src={imageUrl} className={styles.uploadImage} alt="avatar" /> : uploadButton}
                </Upload>
              )}

            </FormItem>
            <FormItem {...formItemLayout} label="关键字">
              {getFieldDecorator('keyWord',{
                rules: [
                  {
                    required: true,
                    message:'请输入关键字'
                  }
                ]
              })(<Input className={styles.input} placeholder="关键字" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="适用人群">
              {getFieldDecorator('audiences',{
                rules: [
                  {
                    required: true,
                    message:'请输入适用人群'
                  }
                ]
              })(<Input className={styles.input} placeholder="适用人群" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="价格">
              {getFieldDecorator('price',{
                rules: [
                  {
                    required: true,
                    message:'请输入价格'
                  }
                ]
              })(<InputNumber placeholder="价格" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="原始价格">
              {getFieldDecorator('originPrice',{
                rules: [
                  {
                    required: true,
                    message:'请输入原始价格'
                  }
                ]
              })(<InputNumber placeholder="原始价格" />)}
            </FormItem>
           
            <FormItem {...formItemLayout} label="介绍">
              {getFieldDecorator('detail',{
               
              })(<div className={styles.editor}><BraftEditor /></div>)}
            </FormItem>
            <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
              <Button type="primary" htmlType="submit" loading={false}>
                提交
              </Button>
              <Button style={{ marginLeft: 8 }}>
                返回
              </Button>
            </FormItem>
          </Form>
        </Card>
      </PageHeaderWrapper>
    )
  }
}
export default AddOnlineCourse