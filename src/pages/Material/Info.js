import React, { Component, Fragment } from 'react';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import DescriptionList from '@/components/DescriptionList';
import { Card, Button, Icon, Dropdown, Menu, Badge, Row ,Col, Breadcrumb } from 'antd';
import { FormattedNumber } from 'react-intl'
import { connect } from 'dva';
import styles from './Info.less';

const { Description } = DescriptionList;
const ButtonGroup = Button.Group;
const { Meta } = Card;
const menu = (
  <Menu>
    <Menu.Item key="1">操作1</Menu.Item>
  
  </Menu>
);
const extra = (info) => (
  <Row>
    <Col xs={24} sm={12}>
      <div className={styles.textSecondary}>状态</div>
      <div className={styles.heading}>
      {info.status == 0 ? <Badge status="error" text="未发布" />:<Badge status="success" text="已发布" />}
      
      </div>
    </Col>
    <Col xs={24} sm={12}>
      <div className={styles.textSecondary}>销量</div>
      <div className={styles.heading}>{info.saleNum}</div>
    </Col>
  </Row>
);
     
const description = (info) => (
  
  

  <div className={styles.outer}>
    <div className={styles.sidebar} >
      <img src={info.image} />
    </div>
    <div className={styles.content} >
      <DescriptionList  size="small" col="1">
        <Description term="书号">{info.isbn}</Description>
        <Description term="副标题">{info.subtitle}</Description>
        <Description term="丛书的书名">{info.series}</Description>
        <Description term="资源类型">{info.type == 3?'海外教材':'阅读世界'}</Description>
        <Description className={styles.classify} term="分类"><Breadcrumb>{info.classifyIds.map(val => <Breadcrumb.Item>{val}</Breadcrumb.Item>)}</Breadcrumb></Description>
        <Description term="电子书价格"><FormattedNumber value={info.listprice} style="currency" currency="CNY"></FormattedNumber></Description>
        <Description term="纸书价格"><FormattedNumber value={info.pprice} style="currency" currency="CNY"></FormattedNumber></Description>
        <Description term="促销价格"><FormattedNumber value={info.price} style="currency" currency="CNY"></FormattedNumber></Description>
      </DescriptionList>
    </div>
  </div>
);

@connect(({ material }) => ({
  material,
}))
class MaterialInfo extends Component{

  componentDidMount(){
    const { dispatch } = this.props;
    dispatch({
      type: 'material/info',
      payload: this.props.match.params.id,
    });

  }

  render(){

    const {
      material: { info },
    } = this.props;

    const action = (
      <Fragment>
        {/* <ButtonGroup>
          <Button>编辑</Button>
          <Dropdown overlay={menu} placement="bottomRight">
            <Button>
              <Icon type="ellipsis" />
            </Button>
          </Dropdown>
        </ButtonGroup> */}
        {/* <Button type="primary" >返回</Button> */}
      </Fragment>
    );
    return(
      <PageHeaderWrapper
        title={`教材名称${info.title}`}
        action={action}
        content={description(info)}
        extraContent={extra(info)}
        tabList={[
          {
            key: 'detail',
            tab: '详细信息',
          },
        ]}
      >
        <Card>
          <DescriptionList style={{ marginBottom: 24 }}>
            <Description term="出版社">{info.publisher}</Description>
            <Description term="出版日期">{info.pubDate}</Description>
            <Description term="作者">{info.author}</Description>
            <Description term="编者">{info.editor}</Description>
            <Description term="页数">{info.pages}</Description>
            <Description term="卷数">{info.volume}</Description>
            <Description term="版次">{info.edition}</Description>
            <Description term="最新印次">{info.latestRaprintNumber}</Description>
            <Description term="币种">{info.currency}</Description>
            <Description term="授权年">{info.copyrightYear}</Description>
            <Description term="授权所有者">{info.copyrightOwner}</Description>
            <Description term="语种">{info.language}</Description>
            <Description term="关键词">{info.keywords}</Description>
            <Description term="读者对象">{info.readerShip}</Description>
            <Description term="作者介绍">{info.biographicalNote}</Description>
            <Description term="蓝思值">{info.lexile}</Description>
          </DescriptionList>
        </Card>
      </PageHeaderWrapper>
    )
  }
}

export default MaterialInfo