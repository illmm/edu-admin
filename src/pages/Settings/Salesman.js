import React from 'react';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import {
  Form,
  Card,
} from 'antd';
import TableForm from './TableForm';

const tableData = [
  {
    key: '1',
    workId: '13166666666',
    name: 'John Brown',
    department: 'gtillmm@gmail.com',
  },
  {
    key: '2',
    workId: '13166666666',
    name: 'Jim Green',
    department: 'gtillmm@gmail.com',
  },
  {
    key: '3',
    workId: '13166666666',
    name: 'Joe Black',
    department: '13166666666@131.com',
  },
];
@Form.create()
class Salesman extends React.Component{
    render(){
      const {
        form: { getFieldDecorator },
      } = this.props;
      return(
        <PageHeaderWrapper
          title="销售管理"
          
        >
          <Card title="销售列表" bordered={false}>
            {getFieldDecorator('members', {
            initialValue: tableData,
          })(<TableForm />)}
          </Card>
        </PageHeaderWrapper>
      ) 
    }
}

export default Salesman;