import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import CommonSelect from '@/components/BusinessData/CommonSelect';



@connect(({ global })=>({
  global,
}))
class Source extends Component {
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
      type: 'global/source',
    })
  }

  handleChange = value => {
    const { onChange } = this.props;
    if (onChange) {
      onChange(value);
    }
  };

  render() {
    const { className, allowClear,global: { source }  } = this.props;
    return (
      <CommonSelect 
        data={source}
        placeholder="选择来源"
        className={className} 
        allowClear={allowClear}
        onChange={this.handleChange}
      />
    );
  }
}


export default Source;
