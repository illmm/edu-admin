import React, { Fragment } from 'react';
import { formatMessage } from 'umi/locale';
import { Layout, Icon } from 'antd';
import GlobalFooter from '@/components/GlobalFooter';

const { Footer } = Layout;
const FooterView = () => (
  <Footer style={{ padding: 0 }}>
    <GlobalFooter
      // links={[
      //   {
      //     key: '中图集团',
      //     title: '中图集团',
      //     href: 'http://www.cnpiec.com.cn',
      //     blankTarget: true,
      //   },
      //   {
      //     key: '中图教育',
      //     title: '中图教育',
      //     href: 'http://www.cnpeducation.com/',
      //     blankTarget: true,
      //   },
        
      // ]}
      copyright={
        <Fragment>
          Copyright <Icon type="copyright" /> {formatMessage({id: "corporate.name"})}
        </Fragment>
      }
    />
  </Footer>
);
export default FooterView;
