import React,{PureComponent, Fragment} from 'react';
import moment from 'moment';
import { connect } from 'dva';
import StandardTable from '@/components/StandardTable';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { Button,Card } from 'antd';
import styles from './List.less';

/* eslint react/no-multi-comp:0 */
@connect(({ agency,loading }) => ({
    agency,
    loading: loading.models.users,
}))
export default class AgencyList extends PureComponent{
  state = {
    selectedRows: [],
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
      title: '描述',
      dataIndex: 'description',
    },
    {
      title: '销售员',
      dataIndex: 'salesman',
    },
    {
      title: '服务截止日期',
      dataIndex: 'expireTime',
      sorter: true,
      render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>
    },
    {
      title: '操作',
      render: (text,record) => (
        <Fragment>
          <a>编辑</a>
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
    
    

  render(){
    const {
      agency: { data },
      loading,
    } = this.props;
    const { selectedRows } = this.state;
    return(
      <PageHeaderWrapper>
        <Card>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}></div>
            <div className={styles.tableListOperator}>
            <Button icon="plus" type="primary">
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
      </PageHeaderWrapper>
        
    ) 
  }
}