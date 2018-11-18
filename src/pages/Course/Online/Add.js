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

@connect(({ global, course, loading }) => ({
  global,
  course,
  loading:loading.effects['global/getClassify'],
}))

@Form.create()
class AddOnlineCourse extends PureComponent{

  state = {
    uploadLoading: false,
    qiniuToken:'',
    editorState: BraftEditor.createEditorState()
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
      type: 'global/organization',
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

  handleChange = (editorState) => {
    this.setState({ editorState })
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

  getOrganizationOption = () => {
   
    const { global: { organization } } = this.props;
    return this.getOption(organization);
  };

  getOption = list => {
    if (!list || list.length < 1) {
      return (
        <Option key={0} value={0}>
          暂无选项
        </Option>
      );
    }
    return list.map(item => (
      <Option key={item.id} value={item.id}>
        {item.name}
      </Option>
    ));
  };


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

  preview = () => {

    if (window.previewWindow) {
      window.previewWindow.close()
    }

    window.previewWindow = window.open()
    window.previewWindow.document.write(this.buildPreviewHtml())
    window.previewWindow.document.close()

  }

  buildPreviewHtml () {
    const { editorState } = this.state;
    return `
      <!Doctype html>
      <html>
        <head>
          <title>Preview Content</title>
          <style>
            html,body{
              height: 100%;
              margin: 0;
              padding: 0;
              overflow: auto;
              background-color: #f1f2f3;
            }
            .container{
              box-sizing: border-box;
              width: 1000px;
              max-width: 100%;
              min-height: 100%;
              margin: 0 auto;
              padding: 30px 20px;
              overflow: hidden;
              background-color: #fff;
              border-right: solid 1px #eee;
              border-left: solid 1px #eee;
            }
            .container img,
            .container audio,
            .container video{
              max-width: 100%;
              height: auto;
            }
            .container p{
              white-space: pre-wrap;
              min-height: 1em;
            }
            .container pre{
              padding: 15px;
              background-color: #f1f1f1;
              border-radius: 5px;
            }
            .container blockquote{
              margin: 0;
              padding: 15px;
              background-color: #f1f1f1;
              border-left: 3px solid #d1d1d1;
            }
          </style>
        </head>
        <body>
          <div class="container">${editorState.toHTML()}</div>
        </body>
      </html>
    `

  }

  render(){
    const {
      form: { getFieldDecorator },
      global: { classify, tags, source },
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

    function filter(inputValue, path) {
      return (path.some(option => (option.label).toLowerCase().indexOf(inputValue.toLowerCase()) > -1));
    }
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">上传</div>
      </div>
    );
    const extendControls = [
      {
        key: 'custom-button',
        type: 'button',
        text: '预览',
        onClick: this.preview
      }
    ]
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
                <Select style={{width:300}} placeholder="请选择机构" onChange={this.handleOrganizChange}>
                  {this.getOrganizationOption()}
                </Select>)}
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
                <Select style={{width:300}} placeholder="请选择课程" onChange={this.handleBBCourseChange}>
                  {bbCourse.map(item => <Option props={item} key={item.pkIdKey}>{item.title}</Option>)}
                </Select>)}
            </FormItem>
            <FormItem {...formItemLayout} label="分类">
              {getFieldDecorator('classifies',{
                rules: [
                  {
                    required: true,
                    message:'请选择分类'
                  }, 
                ],
              })
              (<Cascader 
                style={{width:300}}
                options={classify}     
                placeholder="请选择分类" 
                showSearch={{ filter }}
              />)}
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
              {getFieldDecorator('sourceId',{
                rules: [
                  {
                    required: true,
                    message:'请选择来源'
                  }
                ]
              })
              (
                <Select
                  style={{width:300}}
                  placeholder="选择来源"
                >
                  {source.map(item => <Option key={item.id}>{item.name}</Option>)}
                </Select>)}
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
                    console.log(value);
                    if (value) {
                      callback()
                    } else {
                      callback('请输入正文内容')
                    }
                  }
                }],
                // style={{ border:'1px solid #d1d1d1',borderRadius:'5px'}}
              })(
                <BraftEditor 
                  onChange={this.handleChange}
                  className={styles.editor} 
                  placeholder="请输入简介" 
                  extendControls={extendControls}
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