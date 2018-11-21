import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CommonSelect from '@/components/BusinessData/CommonSelect';
import { connect } from 'dva';

@connect(({ global })=>({
  global,
}))
class Tag extends Component {
  static propTypes = {
    onChange: PropTypes.func,
  };

  static defaultProps = {
    onChange: () => {},
  };

  constructor(props) {
    super(props);
    this.state = {
     
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'global/tags',
    })
  }

  handleChange = value => {
    const { onChange } = this.props;
    if (onChange) {
      onChange(value);
    }
  };

  render() {
   
    const { className, global: { tags } } = this.props;
    return (
      <CommonSelect 
        mode="multiple"
        data={tags}
        placeholder="选择标签"
        className={className} 
        onChange={this.handleChange}
      />
    );
  }
}


export default Tag;
