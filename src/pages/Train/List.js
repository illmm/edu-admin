import React,{ Fragment, PureComponent } from 'react';
import moment from 'moment';
import { FormattedNumber } from 'react-intl'
import { connect } from 'dva';
import StandardTable from '@/components/StandardTable';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { formatMessage } from 'umi/locale';
import Link from 'umi/link';
import { 
  Form,
  Card,
  Button,
 } from 'antd';
import styles from './Styles.less'

 @connect(({ train, loading }) => ({
  train,
  loading: loading.effects['train/list'],
 }))

@Form.create()
class TrainList extends PureComponent{
  state = {
    selectedRows: [],
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'train/list',
      payload:{}
    })
  }

  columns = [
    {
      title: '名称',
      dataIndex: 'title',
    },
    {
      title: '价格',
      dataIndex: 'price',
      render(val){
        return <FormattedNumber value={val} style="currency" currency="CNY" />
      },
    },
    {
      title: '开始时间',
      dataIndex: 'startTime',
      sorter: true,
      render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>
    },
    {
      title: '结束时间',
      dataIndex: 'endTime',
      sorter: true,
      render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>
    },
    {
      title: '操作',
      render: (text,record) => (
        <Fragment>
          <Link to={`/train/${record.id}`}>详情</Link>
        </Fragment>
      ),
    }
  ]

  /**
   * @method 列表选择事件
   */
  handleSelectRows = rows => {
    this.setState({
      selectedRows: rows,
    });
  };

  render(){
    const { selectedRows } = this.state;
    const { 
      train: { list },
      loading,
    } = this.props;
    return(
      <PageHeaderWrapper>
        <Card>
          <div className={styles.tableList}>
            <div className={styles.tableListForm} />
            <div className={styles.tableListOperator}>
              <Button icon="plus" type="primary">
            新建培训
              </Button>
              {selectedRows.length > 0 && (
              <span>
                <Button>删除</Button>
                <Dropdown overlay={menu}>
                  <Button>
                更多<Icon type="down" />
                  </Button>
                </Dropdown>
              </span>
          )}
            </div>
            <StandardTable
              rowKey='id'
              selectedRows={selectedRows}
              data={list}
              loading={loading}
              columns={this.columns}
              onSelectRow={this.handleSelectRows}
            />
          </div>
        </Card>
      </PageHeaderWrapper>
    ) 
  }
}

export default TrainList;