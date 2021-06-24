import { Component } from 'react';
import Input from '../components/Input';
// import {createForm} from "rc-form";
// import { createForm } from '../components/my-rc-form0';
import Form from '../components/my-rc-form';

const nameRules = { required: true, message: '请输入姓名！' };
const passworRules = { required: true, message: '请输入密码！' };

class MyRCForm extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { setFieldsValue } = this.props.form;
    setFieldsValue({ username: 'default username' });
  }

  submit = () => {
    const { getFieldsValue, getFieldValue, validateFields } = this.props.form;
    console.log(getFieldsValue(), getFieldValue('username'));

    validateFields((err, vals) => {
      if (err) {
        console.log('失败', err);
      } else {
        console.log('成功', vals);
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <h3>MyRCForm</h3>
        <Form onSubmit={this.submit}>
          <Form.Item>{getFieldDecorator('username', { rules: [nameRules] })(<Input placeholder='Username' />)}</Form.Item>
          <Form.Item>{getFieldDecorator('password', { rules: [passworRules] })(<Input placeholder='Password' />)}</Form.Item>
          <button>submit</button>
        </Form>
      </div>
    );
  }
}

// export default Form.createForm(MyRCForm);
export default Form.create()(MyRCForm);
