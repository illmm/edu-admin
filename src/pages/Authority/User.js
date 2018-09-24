import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import {
  Row,
  Col,
  Card,
  Form,
  Input,
  Select,
  Icon,
  Button,
  Dropdown,
  Menu,
  InputNumber,
  Modal,
  message,
  Badge,
  Switch,
} from 'antd';
import StandardTable from '@/components/StandardTable';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './User.less';

const FormItem = Form.Item;
const { Option } = Select;
const getValue = obj =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');

const CreateForm = Form.create()(props => {
  const { modalVisible,organizationCode, form, setOrganizationCode,handleAdd, handleModalVisible,getOrganizationOption,getRoleOption } = props;
  
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      //form.resetFields();
      handleAdd(fieldsValue);
    });
  };
  return (
    <Modal
      destroyOnClose
      title="新建用户"
      okText="创建"
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => handleModalVisible()}
    >
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="机构">
        {form.getFieldDecorator('organizeId', {
          rules: [{ required: true, message: '请选择机构！' }],
        })(
          <Select placeholder="请选择" style={{ width: '100%' }} onChange={setOrganizationCode}>
            {getOrganizationOption()}
          </Select>
        )}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="角色">
        {form.getFieldDecorator('roleId', {
          rules: [{ required: true, message: '请选择角色！' }],
        })(
          <Select placeholder="请选择角色" style={{ width: '100%' }}>
            {getRoleOption()}
          </Select>
        )}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="姓名">
        {form.getFieldDecorator('name', {
          rules: [
            { 
              required: true, 
              message: '请输入姓名！' 
            }
          ],
        })(<Input placeholder="请输入姓名" />)}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="账号">
        {form.getFieldDecorator('account', { 
          rules: [
            { required: true, 
              message: '请输入账号'
            },
            {
              min:4,max:16,
              message:'用户名必须为4-16位'
            },
            { pattern: new RegExp('^\\w+$','g'), 
              message: '用户名必须为字母或者数字' 
            }
          ],
        })(<Input  addonBefore={organizationCode} placeholder="请输入账号"/>)}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="密码">
        {form.getFieldDecorator('password', {
          rules: [
            { required: true, 
              message: '请输入密码！' 
            },
            { min:6,
              max:20, 
              message: '密码必须为6-20位' 
            }
          ],
        })(<Input placeholder="请输入密码" type="password" />)}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="手机">
        {form.getFieldDecorator('phone', {
          rules: [
            { 
              message: '请输入手机！' 
            },
            { 
              pattern: new RegExp('^((13[0-9])|(14[5,7])|(15[0-3,5-9])|(17[0,3,5-8])|(18[0-9])|166|198|199|(147))\\d{8}$','g'), 
              message: '手机号格式错误' 
            }
          ],
        })(<Input placeholder="请输入手机" />)}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="邮箱">
        {form.getFieldDecorator('email', {
          rules: [{ message: '请输入邮箱！' },{type: 'email',message: '邮箱格式错误！'}],
        })(<Input placeholder="请输入邮箱" />)}
      </FormItem>
      
    </Modal>
  );
});

@Form.create()
class UpdateForm extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      formVals: {
        name: props.values.name,
        email: props.values.email,
        id: props.values.key,
        roleId: props.values.roleId,
        phone: props.values.phone,
        account:props.values.account,
        status:props.values.status,
      },
      currentStep: 0,
    };

    this.formLayout = {
      labelCol: { span: 7 },
      wrapperCol: { span: 13 },
    };
  }
  updateOkHandle = () => {
    const { form,handleUpdate} = this.props;
    const { formVals:oldVal } = this.state;
  
    form.validateFields((err,fieldsValue) => {
      const formVals = { ...oldVal, ...fieldsValue };
      if (err) return;
      handleUpdate(formVals);
    });
  };
  

  backward = () => {
    const { currentStep } = this.state;
    this.setState({
      currentStep: currentStep - 1,
    });
  };

  forward = () => {
    const { currentStep } = this.state;
    this.setState({
      currentStep: currentStep + 1,
    });
  };
  changeStatus = (value) => {
    
    this.setState({
      formVals:{
        ...this.state.formVals,
        status:value
      }
    });
  };
  render() {
    const { form, updateModalVisible,handleUpdateModalVisible,getRoleOption } = this.props;
    const { formVals } = this.state;
    return (
      <Modal
        width={640}
        bodyStyle={{ padding: '32px 40px 48px' }}
        destroyOnClose
        title="编辑用户"
        visible={updateModalVisible}
        onCancel={() => handleUpdateModalVisible()}
        onOk={() => this.updateOkHandle()}
        >
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="账号">
          {formVals.account}
        </FormItem>
        {/* <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="机构">
          {form.getFieldDecorator('organizeId', {
          
            initialValue:formVals.organizeId,
            rules: [{ required: true, message: '请选择机构！' }],
        })(
          <Select placeholder="请选择" style={{ width: '100%' }}>
            {getOrganizationOption()}
          </Select>
        )}
        </FormItem> */}
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="角色">
          {form.getFieldDecorator('roleId', {
            initialValue: formVals.roleId,
            rules: [{ required: true, message: '请选择角色！' }],
          })(
            <Select placeholder="请选择角色" style={{ width: '100%' }}>
              {getRoleOption()}
            </Select>
          )}
        </FormItem>
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="姓名">
          {form.getFieldDecorator('name', {
            initialValue: formVals.name,
            rules: [
              { 
                required: true, 
                message: '请输入姓名！' 
              }
            ],
          })(<Input placeholder="请输入姓名" />)}
        </FormItem>
        
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="手机">
          {form.getFieldDecorator('phone', {
            initialValue: formVals.phone,
            rules: [
              { 
                message: '请输入手机！' 
              },
              { 
                pattern: new RegExp('^((13[0-9])|(14[5,7])|(15[0-3,5-9])|(17[0,3,5-8])|(18[0-9])|166|198|199|(147))\\d{8}$','g'), 
                message: '手机号格式错误' 
              }
            ],
          })(<Input placeholder="请输入手机" />)}
        </FormItem>
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="邮箱">
          {form.getFieldDecorator('email', {
            initialValue: formVals.email,
            rules: [
              { 
                message: '请输入邮箱！' 
              },
              {
                type: 'email',
                message: '邮箱格式错误！'
              }
            ],
          })(<Input placeholder="请输入邮箱" />)}
        </FormItem>
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="状态">
       
          <Switch 
              unCheckedChildren = "禁用" 
              defaultChecked = {formVals.status}  
              checkedChildren = "启用"
              onChange={checked => this.changeStatus(checked)}
            />
          
        </FormItem>
      </Modal>
    );
    
  }
}

/* eslint react/no-multi-comp:0 */
@connect(({ users, loading, global }) => ({
  users,
  loading: loading.models.users,
  global,
}))

@Form.create()
export default class TableList extends PureComponent {
  state = {
    modalVisible: false,
    updateModalVisible: false,
    expandForm: false,
    selectedRows: [],
    formValues: {},
    stepFormValues: {},
    organizationCode:"",
  };

  columns = [
    {
      title: '机构名称',
      dataIndex: 'organizationName',
    },
    {
      title: '姓名',
      dataIndex: 'name',
    },
    {
      title: '账号',
      dataIndex: 'account',
    },
    {
      title: '角色',
      dataIndex: 'roleName',
    },
    {
      title: '状态',
      dataIndex: 'status',
      filters: [
        {
          text: "启用",
          value: 1,
        },
        {
          text: "禁用",
          value: 0,
        },
      ],
      render(val) {
        if(val)
          return <Badge status="success" text="启用" />;
        else
          return <Badge status="error" text="禁用" />;
      },
    },
    {
      title: '手机号',
      dataIndex: 'phone',
    },

    {
      title: '最后登录时间',
      dataIndex: 'loginLastTime',
      sorter: true,
      render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
    },
    {
      title: '操作',
      render: (text, record) => (
        <Fragment>
          <a onClick={() => this.handleUpdateModalVisible(true, record)}>编辑</a>
          {/* <Divider type="vertical" /> */}
        </Fragment>
      ),
    },
  ];

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'users/fetch',
    });
    dispatch({
      type: 'global/organization',
    });
    dispatch({
      type: 'global/role',
    });

  }
  

  handleStandardTableChange = (pagination, filtersArg, sorter) => {
    const { dispatch } = this.props;
    const { formValues } = this.state;

    const filters = Object.keys(filtersArg).reduce((obj, key) => {
      const newObj = { ...obj };
      newObj[key] = getValue(filtersArg[key]);
      return newObj;
    }, {});

    const params = {
      currentPage: pagination.current,
      pageSize: pagination.pageSize,
      ...formValues,
      ...filters,
    };
    if (sorter.field) {
      params.sorter = `${sorter.field}_${sorter.order}`;
    }

    dispatch({
      type: 'users/fetch',
      payload: params,
    });
  };

  handleFormReset = () => {
    const { form, dispatch } = this.props;
    form.resetFields();
    this.setState({
      formValues: {},
    });
    dispatch({
      type: 'users/fetch',
      payload: {},
    });
  };

  toggleForm = () => {
    const { expandForm } = this.state;
    this.setState({
      expandForm: !expandForm,
    });
  };

  handleMenuClick = e => {
    switch (e.key) {
      case 'remove':
        this.handleDelete();
        break;
      default:
        break;
    }
  };
  
  handleDelete = () => {
    const { selectedRows } = this.state;
    Modal.confirm({
      title: '删除用户',
      content: `确定删除选中的${selectedRows.length}位用户吗？`,
      okText: '确认',
      cancelText: '取消',
      centered:true,
      onOk: () => {
        const { dispatch } = this.props;
        

        if (!selectedRows) return;
        dispatch({
          type: 'users/remove',
          payload: {
            key: selectedRows.map(row => row.key),
          },
          callback: ( _ = res => {
            if(res.success){
              message.success("删除成功");
              this.handleFormReset();
            }else{
              message.error(res.msg);
            }
            this.setState({
              selectedRows: [],
            });
          }),
        });
      },
    });
    

  }

  handleSelectRows = rows => {
    this.setState({
      selectedRows: rows,
    });
  };

  handleSearch = e => {
    e.preventDefault();

    const { dispatch, form } = this.props;

    form.validateFields((err, fieldsValue) => {
      if (err) return;

      const values = {
        ...fieldsValue,
        updatedAt: fieldsValue.updatedAt && fieldsValue.updatedAt.valueOf(),
      };

      this.setState({
        formValues: values,
      });

      dispatch({
        type: 'users/fetch',
        payload: values,
      });
    });
  };

  handleModalVisible = flag => {
    this.setState({
      modalVisible: !!flag,
      organizationCode: "",
    });
  };

  handleUpdateModalVisible = (flag, record) => {  
    this.setState({
      updateModalVisible: !!flag,
      stepFormValues: record || {},
    });
  };

  handleAdd = fields => {
    const { dispatch } = this.props;
    dispatch({
      type: 'users/add',
      payload: {
        ...fields,
      },
      callback: (_ = res => {
        if(res.success){
          message.success('添加成功');
          
          this.handleFormReset();
        }else{
          message.error(res.msg);
        }
      }),
    });
    this.handleModalVisible();

   
    
  };

  handleUpdate = fields => {
    const { dispatch } = this.props;
    dispatch({
      type: 'users/update',
      payload: {
        ...fields
      },
      callback: (_ = res => {
        if(res.success){
          message.success('更新成功');
          this.handleFormReset();
          
        }else{
          message.error(res.msg);
        }
      }),
    });
    this.handleUpdateModalVisible();
  };

  getOrganizationOption = () => {
   
    const { global:{organization} } = this.props;
    return this.getOption(organization);
  };
  getRoleOption = () => {
    const { global:{role} } = this.props;
    return this.getOption(role);
  };
  getOption = list => {
    if (!list || list.length < 1) {
      return (
        <Option key={0} value={0}>
          没有找到选项
        </Option>
      );
    }
    return list.map(item => (
      <Option key={item.id} value={item.id}>
        {item.name}
      </Option>
    ));
  };

  setOrganizationCode = value =>{
    const { dispatch } = this.props;
    dispatch({
      type: 'global/organizationCode',
      payload: value,
      callback: (_ = res => {
        this.setState({
          organizationCode:res.data
        });
      }),
    });
  }

  renderSimpleForm() {
    const {
      form: { getFieldDecorator },
     
    } = this.props;
    
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
          
            <FormItem label="机构名称">
            
              {getFieldDecorator('organizeId')(
                
                <Select 
                  allowClear={true} 
                  placeholder="请选择" 
                  style={{ width: '100%' }} 
                >
                  {this.getOrganizationOption()}
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="用户角色">
              {getFieldDecorator('roleId')(
                <Select placeholder="请选择" style={{ width: '100%' }} allowClear={true} >
                  {this.getRoleOption()}
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <span className={styles.submitButtons}>
              <Button type="primary" htmlType="submit">
                查询
              </Button>
              <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
                重置
              </Button>
              <a style={{ marginLeft: 8 }} onClick={this.toggleForm}>
                展开 <Icon type="down" />
              </a>
            </span>
          </Col>
        </Row>
      </Form>
    );
  }

  renderAdvancedForm() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="机构名称">
              {getFieldDecorator('organizeId')(
                <Select placeholder="请选择" style={{ width: '100%' }} allowClear={true} >
                  {this.getOrganizationOption()}
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="用户角色">
              {getFieldDecorator('roleId')(
                <Select placeholder="请选择" style={{ width: '100%' }} allowClear={true} >
                  {this.getRoleOption()}
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="用户姓名">
              {getFieldDecorator('name')(
                <Input style={{ width: '100%' }}  placeholder="通过姓名查询"/>
              )}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
              <FormItem label="用户账号">
                {getFieldDecorator('account')(
                  <Input style={{ width: '100%' }}  placeholder="通过账号查询"/>
                )}
              </FormItem>
            </Col>
          <Col md={8} sm={24}>
            <FormItem label="手机号码">
              {getFieldDecorator('phone')(
                <Input style={{ width: '100%' }}  placeholder="通过手机号查询"/>
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="电子邮箱">
              {getFieldDecorator('email')(
                <Input style={{ width: '100%' }}  placeholder="通过电子邮箱查询"/>
              )}
            </FormItem>
          </Col>
          {/* <Col md={8} sm={24}>
            <FormItem label="用户状态">
              {getFieldDecorator('status')(
                <Select placeholder="请选择" style={{ width: '100%' }} allowClear={true} >
                  <Option value="1">启用</Option>
                  <Option value="0">禁用</Option>
                </Select>
              )}
            </FormItem>
          </Col> */}
        </Row>
        <div style={{ overflow: 'hidden' }}>
          <div style={{ float: 'right', marginBottom: 24 }}>
            <Button type="primary" htmlType="submit">
              查询
            </Button>
            <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
              重置
            </Button>
            <a style={{ marginLeft: 8 }} onClick={this.toggleForm}>
              收起 <Icon type="up" />
            </a>
          </div>
        </div>
      </Form>
    );
  }

  renderForm() {
    const { expandForm } = this.state;
    return expandForm ? this.renderAdvancedForm() : this.renderSimpleForm();
  }

  render() {
    const {
      users: { data },
      loading,
    } = this.props;
    const { selectedRows, modalVisible,organizationCode, updateModalVisible, stepFormValues } = this.state;
    const menu = (
      <Menu onClick={this.handleMenuClick} selectedKeys={[]}>
        <Menu.Item key="disable">禁用</Menu.Item>
        {/* <Menu.Item key="approval">通知</Menu.Item> */}
      </Menu>
    );
    const parentMethods = {
      handleAdd: this.handleAdd,
      handleModalVisible: this.handleModalVisible,
      getOrganizationOption: this.getOrganizationOption,
      getRoleOption: this.getRoleOption,
      setOrganizationCode: this.setOrganizationCode,
    };
    const updateMethods = {
      handleUpdateModalVisible: this.handleUpdateModalVisible,
      handleUpdate: this.handleUpdate,
      getOrganizationOption: this.getOrganizationOption,
      getRoleOption: this.getRoleOption,
    };
    return (
      <PageHeaderWrapper>
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>{this.renderForm()}</div>
            <div className={styles.tableListOperator}>
              <Button icon="plus" type="primary" onClick={() => this.handleModalVisible(true)}>
                新建用户
              </Button>
              {selectedRows.length > 0 && (
                <span>
                  <Button onClick={this.handleDelete}>删除</Button>
                  <Dropdown overlay={menu}>
                    <Button>
                      更多操作 <Icon type="down" />
                    </Button>
                  </Dropdown>
                </span>
              )}
            </div>
            <StandardTable
              selectedRows={selectedRows}
              loading={loading}
              data={data}
              columns={this.columns}
              onSelectRow={this.handleSelectRows}
              onChange={this.handleStandardTableChange}
            />
          </div>
        </Card>
        <CreateForm {...parentMethods}  modalVisible={modalVisible} organizationCode={organizationCode} />
        {stepFormValues && Object.keys(stepFormValues).length ? (
          <UpdateForm
            {...updateMethods}
            updateModalVisible={updateModalVisible}
            values={stepFormValues}
          />
        ) : null}
      </PageHeaderWrapper>
    );
  }
}
