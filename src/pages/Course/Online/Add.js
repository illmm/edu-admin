import React, { PureComponent } from 'react'
import PageHeaderWrapper from '@/components/PageHeaderWrapper'
import BraftEditor from 'braft-editor'
import { connect } from 'dva'
import { 
  Card,
  Form,
  Input,
  Select,
  Cascader,
  InputNumber,
  Button,
 } from 'antd';

import 'braft-editor/dist/index.css'
import styles from './Styles.less'

const FormItem = Form.Item;
const { Option } = Select;

@connect(({ global,loading }) => ({
  global,
  loading: loading.effects['global/getClassify'],
}))

@Form.create()
class AddOnlineCourse extends PureComponent{
  state = {

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
  }

  handleSubmit = e => {

  }

  render(){

    const {
      form: { getFieldDecorator, getFieldValue },
      global: { classify, tags },
    } = this.props;
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
    function filter(inputValue, path) {
      return (path.some(option => (option.label).toLowerCase().indexOf(inputValue.toLowerCase()) > -1));
    }
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
              {getFieldDecorator('classify')
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
              {getFieldDecorator('classify')
              (<Input className={styles.input} />)}
            </FormItem>
            <FormItem {...formItemLayout} label="图片">
              {getFieldDecorator('classify')
              (<Input className={styles.input} />)}
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
                rules: [
                  {
                    required: true,
                    message:'介绍'
                  }
                ]
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