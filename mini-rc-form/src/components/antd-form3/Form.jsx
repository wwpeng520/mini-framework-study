import { Component } from 'react';
import createForm from './createForm';
import FormItem from './FormItem';

export default class Form extends Component {
  static create = () => (Cmp) => createForm(Cmp);

  static Item = FormItem;

  render() {
    const { onSubmit, children } = this.props;
    return (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit(e);
        }}
      >
        {children}
      </form>
    );
  }
}
