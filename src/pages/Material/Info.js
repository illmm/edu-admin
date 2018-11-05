import React, { Component, Fragment } from 'react';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import DescriptionList from '@/components/DescriptionList';
import { Card, Button, Icon, Dropdown, Menu, Badge, Row ,Col, } from 'antd';
import styles from './Info.less'

const { Description } = DescriptionList;
const ButtonGroup = Button.Group;
const { Meta } = Card;
const menu = (
  <Menu>
    <Menu.Item key="1">操作1</Menu.Item>
  
  </Menu>
);
const extra = () => (
  <Row>
    <Col xs={24} sm={12}>
      <div className={styles.textSecondary}>状态</div>
      <div className={styles.heading}><Badge status="success" text="已发布" /></div>
    </Col>
    <Col xs={24} sm={12}>
      <div className={styles.textSecondary}>销量</div>
      <div className={styles.heading}>19823</div>
    </Col>
  </Row>
);
     
const description = () => (
   
  <div className={styles.outer}>
    <div className={styles.sidebar} >
      <img src="//static.cnpeducation.com/9780321739759.jpg" />
    </div>
    <div className={styles.content} >
      <DescriptionList  size="small" col="1">
        <Description term="书号">9781305071711</Description>
        <Description term="副标题">我是副标题</Description>
        <Description term="书名">AP</Description>
        <Description term="类型">海外教材</Description>
        <Description term="分类">高中教育/数学/奥数</Description>
        <Description term="电子书价格">￥59.00</Description>
        <Description term="纸书价格">￥59.00</Description>
        <Description term="促销价格">￥59.00</Description>
      </DescriptionList>
    </div>
  </div>
  
     
     
  
);
class MaterialInfo extends Component{

  render(){

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
        <Button type="primary" >操作</Button>
      </Fragment>
    );
    return(
      <PageHeaderWrapper
        title="教材名称：Precalculus with Limits"
        action={action}
        content={description()}
        extraContent={extra()}
        tabList={[
          {
            key: 'detail',
            tab: '详细信息',
          },
        ]}
      >

        <Card>
          <DescriptionList style={{ marginBottom: 24 }}>
           
            <Description term="卷数">第二卷</Description>
            <Description term="版次">第六版</Description>
            <Description term="最新印次">10次</Description>
            <Description term="作者">特朗普</Description>
            <Description term="编者">克林顿</Description>
            <Description term="出版社">华夏出版社</Description>
            <Description term="出版日期">2018-09-10</Description>
            <Description term="页数">225页</Description>
            <Description term="币种">CNY</Description>
          

            <Description term="授权年">2018年</Description>
            <Description term="授权所有者">中图数字</Description>
            <Description term="分类法类型">bic</Description>
            <Description term="分类法编号">100010101010</Description>
            <Description term="语种">英语</Description>
            <Description term="关键词">AP,ACCA</Description>
            <Description term="读者对象">教师</Description>
            <Description term="作者介绍">介绍下作者</Description>
            <Description term="蓝思值">100</Description>
          </DescriptionList>
          
        </Card>
      </PageHeaderWrapper>
    )
  }
}

export default MaterialInfo