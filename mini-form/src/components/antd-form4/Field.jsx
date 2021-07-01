import React, { Component } from 'react';
import FieldContext from './FieldContext';

export default class Field extends Component {
  static contextType = FieldContext;

  componentDidMount() {
    this.unregister = this.context.setFieldEntities(this);
  }

  componentWillUnmount() {
    if (this.unregister) {
      this.unregister();
    }
  }

  // setFieldsValue 时判断需要更新的表单项，并调用此更新，实现最小更新
  onStoreChange = () => {
    this.forceUpdate();
  };

  getControlled = (childrenProps) => {
    const { name } = this.props;
    const { getFieldValue, setFieldsValue } = this.context;
    return {
      ...childrenProps,
      value: getFieldValue(name), // "otz", // get(name) store
      onChange: (e) => {
        setFieldsValue({ [name]: e.target.value });
      },
    };
  };

  render() {
    const { children, label } = this.props;
    const returnChildNode = React.cloneElement(children, this.getControlled(children.props));
    return (
      <div style={{ display: 'flex' }}>
        <div>{label}：</div>
        <div style={{ flex: 1 }}>{returnChildNode}</div>
      </div>
    );
  }
}
