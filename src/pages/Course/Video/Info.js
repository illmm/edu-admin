import React, { Fragment, PureComponent } from 'react';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import DescriptionList from '@/components/DescriptionList';
import moment from 'moment';
import { DragDropContext, DragSource, DropTarget } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import update from 'immutability-helper';
import Link from 'umi/link';

import { Card, Button, Row, Col, Table, Divider, Badge, Alert, Icon } from 'antd';

import styles from './Styles.less';

const { Description } = DescriptionList;

function dragDirection(
  dragIndex,
  hoverIndex,
  initialClientOffset,
  clientOffset,
  sourceClientOffset
) {
  const hoverMiddleY = (initialClientOffset.y - sourceClientOffset.y) / 2;
  const hoverClientY = clientOffset.y - sourceClientOffset.y;
  if (dragIndex < hoverIndex && hoverClientY > hoverMiddleY) {
    return 'downward';
  }
  if (dragIndex > hoverIndex && hoverClientY < hoverMiddleY) {
    return 'upward';
  }
}

class BodyRow extends React.Component {
  render() {
    const {
      isOver,
      connectDragSource,
      connectDropTarget,
      moveRow,
      dragRow,
      clientOffset,
      sourceClientOffset,
      initialClientOffset,
      ...restProps
    } = this.props;
    const style = { ...restProps.style, cursor: 'move' };

    let className = restProps.className;
    if (isOver && initialClientOffset) {
      const direction = dragDirection(
        dragRow.index,
        restProps.index,
        initialClientOffset,
        clientOffset,
        sourceClientOffset
      );
      if (direction === 'downward') {
        className += ' drop-over-downward';
      }
      if (direction === 'upward') {
        className += ' drop-over-upward';
      }
    }

    return connectDragSource(
      connectDropTarget(<tr {...restProps} className={className} style={style} />)
    );
  }
}

const rowSource = {
  beginDrag(props) {
    return {
      index: props.index,
    };
  },
};

const rowTarget = {
  drop(props, monitor) {
    const dragIndex = monitor.getItem().index;
    const hoverIndex = props.index;

    // Don't replace items with themselves
    if (dragIndex === hoverIndex) {
      return;
    }

    // Time to actually perform the action
    props.moveRow(dragIndex, hoverIndex);

    // Note: we're mutating the monitor item here!
    // Generally it's better to avoid mutations,
    // but it's good here for the sake of performance
    // to avoid expensive index searches.
    monitor.getItem().index = hoverIndex;
  },
};

const DragableBodyRow = DropTarget('row', rowTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  sourceClientOffset: monitor.getSourceClientOffset(),
}))(
  DragSource('row', rowSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    dragRow: monitor.getItem(),
    clientOffset: monitor.getClientOffset(),
    initialClientOffset: monitor.getInitialClientOffset(),
  }))(BodyRow)
);

class VideoInfo extends PureComponent {
  components = {
    body: {
      row: DragableBodyRow,
    },
  };

  state = {
    data: [
      {
        key: '1',
        name: '课时1',
        age: '2018-11-11 12:00',
        address: 'New York No. 1 Lake Park',
      },
      {
        key: '2',
        name: '课时2',
        age: '2018-11-11 12:00',
        address: 'London No. 1 Lake Park',
      },
      {
        key: '3',
        name: '课时3',
        age: '2018-11-11 12:00',
        address: 'Sidney No. 1 Lake Park',
      },
    ],
  };

  componentDidMount() {}

  moveRow = (dragIndex, hoverIndex) => {
    const { data } = this.state;
    const dragRow = data[dragIndex];

    this.setState(
      update(this.state, {
        data: {
          $splice: [[dragIndex, 1], [hoverIndex, 0, dragRow]],
        },
      })
    );
  };

  render() {
    // {moment(info.startDate).format('YYYY-MM-DD')}至{moment(info.endDate).format('YYYY-MM-DD')}
    const description = () => (
      <DescriptionList className={styles.headerList} size="small" col="2">
        <Description term="课程编号">课程编号</Description>
        <Description term="分类">分类</Description>
        <Description term="标签">标签</Description>
        <Description term="价格">￥280.00</Description>
        <Description term="原始价格">￥280.00</Description>
        <Description term="创建时间">2018/9/1 12:00</Description>
        <Description term="关键字">关键字</Description>
        <Description term="适用人群">适用人群</Description>
      </DescriptionList>
    );
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
        <Button type="primary" onClick={() => this.handleResourceModalVisible(true)}>
          新增课时
        </Button>
      </Fragment>
    );
    const tabList = [
      {
        key: 'detail',
        tab: '课时列表',
      },
    ];
    const columns = [
      {
        title: '课时名称',
        dataIndex: 'name',
        key: 'name',
        render(val) {
          return (
            <span>
              {val} <Badge count="免费" style={{ backgroundColor: '#52c41a' }} />
            </span>
          );
        },
      },
      {
        title: '创建时间',
        dataIndex: 'age',
        key: 'age',
      },
      {
        title: '操作',
        dataIndex: 'address',
        key: 'address',
        render: record => (
          <Fragment>
            <Link to={`/course/video/${record.id}`}>编辑</Link>
            <Divider type="vertical" />
            <Link to={`/course/video/${record.id}`}>删除</Link>
          </Fragment>
        ),
      },
    ];
    const extra = () => (
      <Row>
        <Col xs={24} sm={12}>
          <div className={styles.textSecondary}>状态</div>
          <div className={styles.heading}>已发布</div>
        </Col>
        <Col xs={24} sm={12}>
          <div className={styles.textSecondary}>浏览量</div>
          <div className={styles.heading}>1821次</div>
        </Col>
      </Row>
    );
    const footer = () => (
      <span>
        <Icon type="smile" theme="twoTone" te /> 温馨提示：拖拽行可进行顺序调整
      </span>
    );
    return (
      <PageHeaderWrapper
        title="Managing the Young Learner Classroom	"
        logo={<img alt="" src="//static.cnpeducation.com/20170119112754df221e.jpg" />}
        action={action}
        content={description()}
        extraContent={extra()}
        tabList={tabList}
      >
        <Card>
          <Table
            pagination={false}
            footer={footer}
            columns={columns}
            dataSource={this.state.data}
            components={this.components}
            onRow={(record, index) => ({
              index,
              moveRow: this.moveRow,
            })}
          />
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default DragDropContext(HTML5Backend)(VideoInfo);
//const Demo = DragDropContext(HTML5Backend)(VideoInfo);

//ReactDOM.render(<VideoInfo />);
//export default VideoInfo;
