import React from 'react';

export default class FormItem extends React.Component {
  state = {};
  render() {
    const { children } = this.props;
    return children;
  }
}
