import React, { PureComponent } from 'react';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import Organization from '@/components/BusinessData/Organization';
import Tag from '@/components/BusinessData/Tag';
import Source from '@/components/BusinessData/Source';
import Classify from '@/components/BusinessData/Classify';
import BraftEditor from 'braft-editor';
import router from 'umi/router';
import { getBase64 } from '@/utils/utils';
import { connect } from 'dva';
import { 
  Card,
  Form,
  Input,
  Select,
  InputNumber,
  Button,
  Upload,
  message,
  Icon,
 } from 'antd';

import 'braft-editor/dist/index.css';
import styles from '../Styles.less';

const FormItem = Form.Item;
const { Option } = Select;

@connect(({ global, course }) => ({
  global,
  course,
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
      type: 'global/getQiniuToekn',
      callback: res => {
        this.setState({
          qiniuToken: res.data.token
        })
      }
    });

    
  }

  componentDidUpdate() {
    const { form, course } = this.props;
    const title = form.getFieldValue('title');
    if(course.addSuccess){
      router.push({
        pathname: '/course/add-result',
        state: {
          title,
          url:'/course/online',
        }
      });
    }
  }


  handleOrganizChange = (value) =>{
    const { dispatch } = this.props;
    dispatch({
      type: 'course/bbCourse',
      payload: value,
    });
  }

  handleBBCourseChange = (key,vals) =>{
    const { props } = vals.props;
    const { form } = this.props;
    form.setFieldsValue({
      introduce: BraftEditor.createEditorState(props.introduce)
    })
    // eslint-disable-next-line
    delete props.introduce;
    this.setState({
      bbProps:props,
    })
  }

  handleSubmit = e => {
    const { dispatch, form } = this.props;
    const { bbProps } = this.state;
    e.preventDefault();

    form.validateFieldsAndScroll((err, values) => {
      if(!err){
        // eslint-disable-next-line
        values.image = values.image.file.response.key;
        // eslint-disable-next-line
        //delete values.image;
        // eslint-disable-next-line
        values.introduceRAW = values.introduce.toRAW();
        // eslint-disable-next-line
        values.introduce = values.introduce.toHTML();
         // eslint-disable-next-line
        const vals = { ...values,...bbProps }
        dispatch({
          type: 'course/add',
          payload: vals,
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
      form: { getFieldDecorator },
      course: { bbCourse },
    } = this.props;

    const { 
      uploadLoading, 
      imageUrl, 
      qiniuToken,
    } = this.state;
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
            <FormItem {...formItemLayout} label="机构">
              {getFieldDecorator('organizationId',{
                rules: [
                  {
                    required: true,
                    message:'请选择机构'
                  }, 
                ],
              })( 
                <Organization className={styles.w300} onChange={this.handleOrganizChange} />
                )}
            </FormItem>
            <FormItem {...formItemLayout} label="课程">
              {getFieldDecorator('title',{
                rules: [
                  {
                    required: true,
                    message:'请选择课程'
                  }, 
                ],
              })( 
                <Select className={styles.w300} placeholder="请选择课程" onChange={this.handleBBCourseChange}>
                  {bbCourse.map(item => <Option props={item} key={item.title}>{item.title}</Option>)}
                </Select>)}
            </FormItem>
            <FormItem {...formItemLayout} label="分类">
              {getFieldDecorator('classifyIds',{
                rules: [
                  {
                    required: true,
                    message:'请选择分类'
                  }, 
                ],
              })
              (<Classify className={styles.w300} isReading={false} />)}
            </FormItem>
            <FormItem {...formItemLayout} label="标签">
              {getFieldDecorator('tagsIds',{
                rules: [
                  {
                    required: true,
                    message:'请选择标签'
                  }
                ]
              })
              (<Tag className={styles.w300} />)}
            </FormItem>
            <FormItem {...formItemLayout} label="来源">
              {getFieldDecorator('sourceId',{
                rules: [
                  {
                    required: true,
                    message:'请选择来源'
                  }
                ]
              })
              (<Source className={styles.w300} />)}
            </FormItem>
            
            <FormItem {...formItemLayout} label="关键字">
              {getFieldDecorator('keyWord',{
                rules: [
                  {
                    required: true,
                    message:'请输入关键字'
                  }
                ]
              })(<Input className={styles.w300} placeholder="关键字" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="适用人群">
              {getFieldDecorator('audiences',{
                rules: [
                  {
                    required: true,
                    message:'请输入适用人群'
                  }
                ]
              })(<Input className={styles.w300} placeholder="适用人群" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="价格">
              {getFieldDecorator('price',{
                rules: [
                  {
                    required: true,
                    message:'请输入价格'
                  }
                ]
              })(<InputNumber precision={2} min={0} max={9999} placeholder="价格" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="原始价格">
              {getFieldDecorator('originPrice',{
                rules: [
                  {
                    required: true,
                    message:'请输入原始价格'
                  }
                ]
              })(<InputNumber precision={2} min={0} max={9999} placeholder="原始价格" />)}
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
            <FormItem {...formItemLayout} label="简介">
              {getFieldDecorator('introduce',{
                validateTrigger: 'onBlur',
                rules: [{
                  required: true,
                  validator: (_, value, callback) => {
                    if (value) {
                      callback()
                    } else {
                      callback('请输入正文内容')
                    }
                  }
                }],
              })(
                <BraftEditor 
                  onChange={this.handleChange}
                  className={styles.editor} 
                  placeholder="请输入简介" 
                />)}
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