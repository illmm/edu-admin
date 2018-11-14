import React,{ Fragment, PureComponent } from 'react';
import moment from 'moment';
import { FormattedNumber } from 'react-intl'
import { connect } from 'dva';
import StandardTable from '@/components/StandardTable';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import Link from 'umi/link';
import { 
  Form,
  Card,
  Button,
  Badge,
 } from 'antd';
import styles from './Styles.less'
import constants,{ status } from '@/constants'

@connect(({ course, loading }) => ({
  course,
  loading: loading.effects['course/online'],
}))

@Form.create()
class VideoList extends PureComponent{
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
          text: constants.status[0],
          value: 0,
        },
        {
          text: constants.status[1],
          value: 1,
        },
      ],
      render(val) {
        return <Badge status={constants.statusMap[val]} text={constants.status[val]} />;
      },
    },
    {
      title: '操作',
      render: (text,record) => (
        <Fragment>
          <Link to={`/course/video/${record.id}`}>详情</Link>
        </Fragment>
      ),
    }
  ]

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'course/video',
      payload:{}
    })
  }

  

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
      course: { videoList },
      loading,
    } = this.props;
    return(
      <PageHeaderWrapper>
        <Card>
          <div className={styles.tableList}>
            <div className={styles.tableListForm} />
            <div className={styles.tableListOperator}>
              <Button icon="plus" type="primary">
            新建视频课程
              </Button>
              {selectedRows.length > 0 && (
              <span>
                {/* <Button onClick={this.handleDelete}>删除</Button> */}
                {/* <Dropdown overlay={menu}>
                <Button>
                更多<Icon type="down" />
                </Button>
              </Dropdown> */}
              </span>
          )}
            </div>
            <StandardTable
              rowKey='id'
              selectedRows={selectedRows}
              data={videoList}
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

export default VideoList;