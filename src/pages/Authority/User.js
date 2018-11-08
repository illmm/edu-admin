import React, { PureComponent, Fragment } from 'react';
import { formatMessage } from 'umi/locale';
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
      title={formatMessage({id: 'app.authority.user.create.modal.title'})}
      okText={formatMessage({id: 'app.authority.user.create.modal.ok'})}
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => handleModalVisible()}
    >
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label={formatMessage({id: 'app.authority.user.organization'})}>
        {form.getFieldDecorator('organizeId', {
          rules: [{ required: true, message: formatMessage({id:'app.please.select'})}],
        })(
          <Select placeholder={formatMessage({id:'app.please.select'})} style={{ width: '100%' }} onChange={setOrganizationCode}>
            {getOrganizationOption()}
          </Select>
        )}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label={formatMessage({id: 'app.authority.user.role'})}>
        {form.getFieldDecorator('roleId', {
          rules: [{ required: true, message: formatMessage({id:'app.please.select'}) }],
        })(
          <Select placeholder={formatMessage({id:'app.please.select'})} style={{ width: '100%' }}>
            {getRoleOption()}
          </Select>
        )}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label={formatMessage({id: 'app.authority.user.name'})}>
        {form.getFieldDecorator('name', {
          rules: [
            { 
              required: true, 
              message: formatMessage({id:'app.please.enter'})
            }
          ],
        })(<Input placeholder={formatMessage({id:'app.please.enter'})} />)}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label={formatMessage({id: 'app.authority.user.account'})}>
        {form.getFieldDecorator('account', { 
          rules: [
            { required: true, 
              message: formatMessage({id:'app.please.enter'})
            },
            {
              min:4,max:16,
              message:formatMessage({id:'app.authority.user.account.error.length'})
            },
            { pattern: new RegExp('^\\w+$','g'), 
              message: formatMessage({id:'app.authority.user.account.error.type'})
            }
          ],
        })(<Input  addonBefore={organizationCode} placeholder={formatMessage({id:'app.please.enter'})}/>)}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label={formatMessage({id: 'app.authority.user.password'})}>
        {form.getFieldDecorator('password', {
          rules: [
            { required: true, 
              message: formatMessage({id:'app.please.enter'}) 
            },
            { min:6,
              max:20, 
              message: formatMessage({id:'app.authority.user.password.error.length'})
            }
          ],
        })(<Input placeholder={formatMessage({id:'app.please.enter'})} type="password" />)}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label={formatMessage({id: 'app.authority.user.phone'})}>
        {form.getFieldDecorator('phone', {
          rules: [
            { 
              message: formatMessage({id:'app.please.enter'}) 
            },
            { 
              pattern: new RegExp('^((13[0-9])|(14[5,7])|(15[0-3,5-9])|(17[0,3,5-8])|(18[0-9])|166|198|199|(147))\\d{8}$','g'), 
              message: formatMessage({id:'app.authority.user.phone.error.format'})
            }
          ],
        })(<Input placeholder={formatMessage({id:'app.please.enter'})} />)}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label={formatMessage({id: 'app.authority.user.email'})}>
        {form.getFieldDecorator('email', {
          rules: [{ message: formatMessage({id:'app.please.enter'}) },{type: 'email',message: formatMessage({id:'app.authority.user.email.error.format'})}],
        })(<Input placeholder={formatMessage({id:'app.please.enter'})} />)}
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
  //更新用户
  updateOkHandle = () => {
    const { form,handleUpdate} = this.props;
    const { formVals:oldVal } = this.state;
  
    form.validateFields((err,fieldsValue) => {
      const formVals = { ...oldVal, ...fieldsValue };
      if (err) return;
      handleUpdate(formVals);
    });
  };
  //修改用户状态state
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
        title={formatMessage({id:'app.edit'})}
        visible={updateModalVisible}
        onCancel={() => handleUpdateModalVisible()}
        onOk={() => this.updateOkHandle()}
        >
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label={formatMessage({id:'app.authority.user.account'})}>
          {formVals.account}
        </FormItem>
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label={formatMessage({id:'app.authority.user.role'})}>
          {form.getFieldDecorator('roleId', {
            initialValue: formVals.roleId,
            rules: [{ required: true, message: formatMessage({id:'app.please.select'}) }],
          })(
            <Select placeholder={formatMessage({id:'app.please.select'})} style={{ width: '100%' }}>
              {getRoleOption()}
            </Select>
          )}
        </FormItem>
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label={formatMessage({id:'app.authority.user.name'})}>
          {form.getFieldDecorator('name', {
            initialValue: formVals.name,
            rules: [
              { 
                required: true, 
                message: formatMessage({id:'app.please.enter'})
              }
            ],
          })(<Input placeholder={formatMessage({id:'app.please.enter'})} />)}
        </FormItem>
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label={formatMessage({id:'app.authority.user.phone'})}>
          {form.getFieldDecorator('phone', {
            initialValue: formVals.phone,
            rules: [
              { 
                message: formatMessage({id:'app.please.enter'})
              },
              { 
                pattern: new RegExp('^((13[0-9])|(14[5,7])|(15[0-3,5-9])|(17[0,3,5-8])|(18[0-9])|166|198|199|(147))\\d{8}$','g'), 
                message: formatMessage({id:'app.authority.user.phone.error.format'})
              }
            ],
          })(<Input placeholder={formatMessage({id:'app.please.enter'})} />)}
        </FormItem>
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label={formatMessage({id:'app.authority.user.email'})}>
          {form.getFieldDecorator('email', {
            initialValue: formVals.email,
            rules: [
              { 
                message: formatMessage({id:'app.please.enter'})
              },
              {
                type: 'email',
                message: formatMessage({id:'app.authority.user.email.error.format'})
              }
            ],
          })(<Input placeholder={formatMessage({id:'app.please.enter'})} />)}
        </FormItem>
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label={formatMessage({id:'app.authority.user.status'})}>
          <Switch 
              unCheckedChildren = {formatMessage({id:'app.authority.user.disable'})}
              defaultChecked = {formVals.status}  
              checkedChildren = {formatMessage({id:'app.authority.user.enable'})}
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
    organizationCode: "",
  };

  columns = [
    {
      title: formatMessage({id:'app.authority.user.organization'}),
      dataIndex: 'organizationName',
    },
    {
      title: formatMessage({id:'app.authority.user.name'}),
      dataIndex: 'name',
    },
    {
      title: formatMessage({id:'app.authority.user.account'}),
      dataIndex: 'account',
    },
    {
      title: formatMessage({id:'app.authority.user.role'}),
      dataIndex: 'roleName',
    },
    {
      title: formatMessage({id:'app.authority.user.status'}),
      dataIndex: 'status',
      filters: [
        {
          text: formatMessage({id:'app.authority.user.enable'}),
          value: 1,
        },
        {
          text: formatMessage({id:'app.authority.user.disable'}),
          value: 0,
        },
      ],
      render(val) {
        if(val)
          return <Badge status="success" text={formatMessage({id:'app.authority.user.enable'})} />;
        else
          return <Badge status="error" text={formatMessage({id:'app.authority.user.disable'})}/>;
      },
    },
    {
      title: formatMessage({id:'app.authority.user.phone'}),
      dataIndex: 'phone',
    },

    {
      title: formatMessage({id:'app.authority.user.lastLoginTime'}),
      dataIndex: 'loginLastTime',
      sorter: true,
      render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
    },
    {
      title: formatMessage({id:'app.authority.user.operating'}),
      render: (text, record) => (
        <Fragment>
          <a onClick={() => this.handleUpdateModalVisible(true, record)}>{formatMessage({id: 'app.edit'})}</a>
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
    if (!selectedRows) return;
    Modal.confirm({
      title: formatMessage({id:'app.delete'}),
      content: `${selectedRows.length}`+formatMessage({id:'app.authority.user.msg.delete'}),
      centered:true,
      onOk: () => {

        const { dispatch } = this.props;
        
        dispatch({
          type: 'users/remove',
          payload: {
            key: selectedRows.map(row => row.key),
          },
          callback: ( _ = res => {
            if(res.success){
              message.success(formatMessage({id:'app.authority.user.msg.success'}));
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
          message.success(formatMessage({id:'app.authority.user.msg.success'}));
          
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
          message.success(formatMessage({id:'app.authority.user.msg.success'}));
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
          {formatMessage({id:'app.authority.user.msg.notOptions'})}
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
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 3 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 },
      },
      colon:false,
    };
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
          
            <FormItem {...formItemLayout} label={formatMessage({id:'app.authority.user.organization'})}>
            
              {getFieldDecorator('organizeId')(
                
                <Select 
                  allowClear={true} 
                  placeholder={formatMessage({id:'app.please.select'})}
                  style={{ width: '100%' }} 
                >
                  {this.getOrganizationOption()}
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem {...formItemLayout} label={formatMessage({id:'app.authority.user.role'})}>
              {getFieldDecorator('roleId')(
                <Select placeholder={formatMessage({id:'app.please.select'})} style={{ width: '100%' }} allowClear={true} >
                  {this.getRoleOption()}
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <span className={styles.submitButtons}>
              <Button type="primary" htmlType="submit">
                {formatMessage({id: 'app.search'})}
              </Button>
              <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
                {formatMessage({id: 'app.reset'})}
              </Button>
              <a style={{ marginLeft: 8 }} onClick={this.toggleForm}>
                {formatMessage({id: 'app.expand'})} <Icon type="down" />
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
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 3 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 },
      },
      colon:false,
    };
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem {...formItemLayout} label={formatMessage({id:'app.authority.user.organization'})}>
              {getFieldDecorator('organizeId')(
                <Select placeholder={formatMessage({id:'app.please.select'})} style={{ width: '100%' }} allowClear={true} >
                  {this.getOrganizationOption()}
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem {...formItemLayout} label={formatMessage({id:'app.authority.user.role'})}>
              {getFieldDecorator('roleId')(
                <Select placeholder={formatMessage({id:'app.please.select'})} style={{ width: '100%' }} allowClear={true} >
                  {this.getRoleOption()}
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem {...formItemLayout} label={formatMessage({id:'app.authority.user.name'})}>
              {getFieldDecorator('name')(
                <Input style={{ width: '100%' }} />
              )}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
              <FormItem  {...formItemLayout} label={formatMessage({id:'app.authority.user.account'})}>
                {getFieldDecorator('account')(
                  <Input style={{ width: '100%' }}  />
                )}
              </FormItem>
            </Col>
          <Col md={8} sm={24}>
            <FormItem {...formItemLayout} label={formatMessage({id:'app.authority.user.phone'})}>
              {getFieldDecorator('phone')(
                <Input style={{ width: '100%' }} />
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem {...formItemLayout} label={formatMessage({id:'app.authority.user.email'})}>
              {getFieldDecorator('email')(
                <Input style={{ width: '100%' }} />
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
              {formatMessage({id: 'app.search'})}
            </Button>
            <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
            {formatMessage({id: 'app.reset'})}
            </Button>
            <a style={{ marginLeft: 8 }} onClick={this.toggleForm}>
            {formatMessage({id: 'app.contract'})} <Icon type="up" />
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
        <Menu.Item key="disable">{formatMessage({id: 'app.disabled'})}</Menu.Item>
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
                {formatMessage({id: 'app.authority.user.create.modal.title'})}
              </Button>
              {selectedRows.length > 0 && (
                <span>
                  <Button onClick={this.handleDelete}>{formatMessage({id: 'app.delete'})}</Button>
                  <Dropdown overlay={menu}>
                    <Button>
                    {formatMessage({id: 'app.more'})}<Icon type="down" />
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
              //onChange={this.handleStandardTableChange}
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
