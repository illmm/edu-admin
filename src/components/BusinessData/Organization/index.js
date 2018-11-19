import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CommonSelect from '@/components/BusinessData/CommonSelect';

import { connect } from 'dva';




@connect(({ global })=>({
  global,
}))
class Organization extends Component {
  static propTypes = {
    className: PropTypes.string,
    onChange: PropTypes.func,
    allowClear: PropTypes.bool,
  };

  static defaultProps = {
    className: '',
    allowClear: false,
    onChange: () => {},
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'global/organization',
    })
  }

  handleChange = value => {
    const { onChange } = this.props;
    if (onChange) {
      onChange(value);
    }
  };


  render() {
    const { className, allowClear, global: { organization } } = this.props;
    return (
      <CommonSelect 
        data={organization}
        placeholder="选择机构"
        className={className} 
        allowClear={allowClear}
        onChange={this.handleChange}
      />
    );
  }
}


export default Organization;
