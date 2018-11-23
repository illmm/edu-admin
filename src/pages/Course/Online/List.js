import React,{ Fragment, PureComponent } from 'react';
import moment from 'moment';
import { FormattedNumber } from 'react-intl'
import { connect } from 'dva';
import StandardTable from '@/components/StandardTable';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { status, statusMap } from '@/constants'
import { 
  Form,
  Card,
  Button,
  Dropdown,
  Icon,
  Menu,
  Modal,
  Badge,
  message,
 } from 'antd';
import Link from 'umi/link';
import styles from '../Styles.less'


 @connect(({ course, loading }) => ({
  course,
  loading: loading.effects['course/online'],
 }))

@Form.create()
class OnlineList extends PureComponent{
  state = {
    selectedRows: [],
  }

  columns = [
    {
      title: '课程名称',
      dataIndex: 'title',
    },
    {
      title: '课程编号',
      dataIndex: 'courseNumber',
    },
    
    {
      title: '价格',
      dataIndex: 'price',
      render(val){
        // eslint-disable-next-line
        return <FormattedNumber value={val} style="currency" currency="CNY" />
      },
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      sorter: true,
      render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>
    },
    {
      title: '状态',
      dataIndex: 'status',
      filters: [
        {
          text: status[0],
          value: 0,
        },
        {
          text: status[1],
          value: 1,
        },
      ],
      render(val) {
        return <Badge status={statusMap[val]} text={status[val]} />;
      },
    },
    {
      title: '操作',
      render: (text,record) => (
        <Fragment>
          <Link to={`/course/online/${record.id}`}>详情</Link>
        </Fragment>
      ),
    }
  ]

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'course/online',
      payload:{}
    });
  }

  
  
  
  /**
   * @method 列表选择事件
   */
  handleSelectRows = rows => {
    this.setState({
      selectedRows: rows,
    });
  };

  handleDelete = () => {

  }
  

  handleUpdateStatus = type => {
    const { selectedRows } = this.state;
    Modal.confirm({
      title: '确认',
      content: `确认选择的${selectedRows.length}项吗？`,
      centered:true,
      onOk: () => {
        const { dispatch } = this.props;
        dispatch({
          type: 'course/updateStatus',
          payload: {
            courseIds: selectedRows.map(row => row.id),
            status:type,
          },
          callback: (res =>{
            if(res.success){
              message.success('操作成功');
              dispatch({
                type: 'course/online',
                payload:{}
              });
            }else{
              message.error(res.msg);
            }
            this.setState({
              selectedRows: [],
            });
          })
        });
      }
    });
  }

   

  render(){
    const { selectedRows } = this.state;
    const { 
      course: { onlineList },
      loading,
    } = this.props;

    const menu = (
      <Menu>
        <Menu.Item onClick={() => this.handleUpdateStatus(0)}>下架</Menu.Item>
        <Menu.Item onClick={() => this.handleUpdateStatus(2)}>关闭</Menu.Item>
        <Menu.Item onClick={this.handleDelete}>删除</Menu.Item>
      </Menu>
    );
    return(
      <PageHeaderWrapper>
        <Card>
          <div className={styles.tableList}>
            <div className={styles.tableListForm} />
            <div className={styles.tableListOperator}>
              <Link to="/course/add/online">
                <Button icon="plus" type="primary">
                  新建在线课程
                </Button>
              </Link>
              {selectedRows.length > 0 && (
              <span>
                <Button onClick={() => this.handleUpdateStatus(1)}>上架</Button>
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
              data={onlineList}
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

export default OnlineList;