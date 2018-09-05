import React, { Fragment } from 'react';
import { Layout, Icon } from 'antd';
import GlobalFooter from '@/components/GlobalFooter';

const { Footer } = Layout;
const FooterView = () => (
  <Footer style={{ padding: 0 }}>
    <GlobalFooter
      links={[
        {
          key: '中图集团',
          title: '中图集团',
          href: 'http://www.cnpiec.com.cn',
          blankTarget: true,
        },
        {
          key: '中图教育',
          title: '中图教育',
          href: 'http://www.cnpeducation.com/',
          blankTarget: true,
        },
        
      ]}
      copyright={
        <Fragment>
          Copyright <Icon type="copyright" /> 2018 中国图书进出口(集团)总公司
        </Fragment>
      }
    />
  </Footer>
);
export default FooterView;
