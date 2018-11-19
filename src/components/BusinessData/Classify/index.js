import React, { Component } from 'react';
import PropTypes  from 'prop-types';
import { Cascader } from 'antd';
import { connect } from 'dva';

@connect(({ global })=>({
  global,
}))
class Classify extends Component {

  static propTypes = {
    onChange: PropTypes.func,
    className: PropTypes.string,
    isReading: PropTypes.bool, 
  };

  static defaultProps = {
    onChange: () => {},
    className: '',
    isReading: false,
  };

  componentDidMount() {
    const { dispatch, isReading } = this.props;
    dispatch({
      type: 'global/classify',
      payload: { 
        type:isReading ? 2 : 1 
      },
    });
  }

  componentDidUpdate(preProps) {
    const { isReading,dispatch } = this.props;
    if (preProps.isReading !== isReading) {
      dispatch({
        type: 'global/classify',
        payload: { 
          type:isReading ? 2 : 1 
        },
      });
    }
  }

  render() {
    const { 
      className,
      onChange,
      global:{ classify } 
    } = this.props;
    function filter(inputValue, path) {
      return (path.some(option => (option.label).toLowerCase().indexOf(inputValue.toLowerCase()) > -1));
    }

    return (
      <Cascader 
        className={className}
        options={classify}     
        placeholder="请选择分类" 
        showSearch={{ filter }}
        onChange={onChange}
      />
      

    );
  }
}

export default Classify;