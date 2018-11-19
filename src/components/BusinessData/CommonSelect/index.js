import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Select } from 'antd';


const { Option } = Select;

class CommonSelect extends Component {
  static propTypes = {
    className: PropTypes.string,
    onChange: PropTypes.func,
    allowClear: PropTypes.bool,
    data: PropTypes.array,
    placeholder: PropTypes.string,
    mode: PropTypes.string,

  };

  static defaultProps = {
    className: '',
    allowClear: false,
    data:[],
    placeholder: '',
    mode: '',
    onChange: () => {},

  };

  handleChange = value => {
    const { onChange } = this.props;
    if (onChange) {
      onChange(value);
    }
  };

  getOption = list => {
    if (!list || list.length < 1) {
      return (
        <Option key={0} value={0}>
          暂无选项
        </Option>
      );
    }
    return list.map(item => (
      <Option key={item.id} value={item.id}>
        {item.name}
      </Option>
    ));
  };

  render() {
    const { className, allowClear, data, placeholder, mode } = this.props;
    return (
      <Select 
        mode={mode}
        placeholder={placeholder}
        allowClear={allowClear} 
        className={className} 
        onChange={this.handleChange}
      >
        {this.getOption(data)}
      </Select>
    );
  }
}


export default CommonSelect;
