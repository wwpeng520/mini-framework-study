import React from 'react';
import FormContext from './context';

export default class FormItem extends React.Component {
  static contextType = FormContext;

  render() {
    const { children, label } = this.props;
    const { errors = [] } = this.context;
    const fieldName = children.props.name;
    const errorMsgs = errors.find((item) => Object.keys(item)?.[0] === fieldName)?.[fieldName] || [];

    return (
      <div>
        {label}：{children}
        <div style={{ color: 'red' }}>{errorMsgs.map((item) => item.message)}</div>
      </div>
    );
  }
}
