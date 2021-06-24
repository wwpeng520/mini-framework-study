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
        const newVal = e.target.value;
        console.log('onChange: ', newVal);
        setFieldsValue({ [name]: newVal });
      },
    };
  };

  render() {
    const { children } = this.props;
    const returnChildNode = React.cloneElement(children, this.getControlled(children.props));
    return returnChildNode;
  }
}
