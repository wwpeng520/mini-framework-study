import React from 'react';

const Input = (props) => <input {...props} />;

class CustomizeInput extends React.Component {
  render() {
    const { value = '', ...otherProps } = this.props;
    return (
      <div style={{ padding: 10 }}>
        <Input style={{ outline: 'none' }} value={value} {...otherProps} />
      </div>
    );
  }
}

export default CustomizeInput;
