import React from 'react';
import { createForm } from './createForm';
import FormItem from './FormItem';

export default class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  // 使用形如 Form.create()(App)
  static create = (...args) => (Cmp) => {
    // return createForm(...args);
    return createForm(Cmp);
  };

  static Item = FormItem;

  render() {
    const { children, onSubmit } = this.props;
    return (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
      >
        {children}
      </form>
    );
  }
}
