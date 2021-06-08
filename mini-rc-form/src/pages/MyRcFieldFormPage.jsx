import React, { useEffect } from 'react';
// import Form, { Field } from "rc-field-form";
import Form, { Field } from '../components/my-rc-field-form';
import Input from '../components/Input';

const nameRules = { required: true, message: '请输入姓名！' };
const passworRules = { required: true, message: '请输入密码！' };

export default function MyRCFieldForm(props) {
  const [form] = Form.useForm();

  const onFinish = (val) => {
    console.log('onFinish', val);
  };

  // 表单校验失败执行
  const onFinishFailed = (val) => {
    console.log('onFinishFailed', val);
  };

  useEffect(() => {
    console.log('form', form);
    form.setFieldsValue({ username: 'default username' });
  }, [form]);

  return (
    <div>
      <h3>MyRCFieldForm</h3>
      <Form form={form} onFinish={onFinish} onFinishFailed={onFinishFailed}>
        <Field name='username' rules={[nameRules]}>
          <Input placeholder='input username' />
        </Field>
        <Field name='password' rules={[passworRules]}>
          <Input placeholder='input password' />
        </Field>
        <button>Submit</button>
      </Form>
    </div>
  );
}

// **********************
// !
// 开辟一个空间存储 store
// store get、set
// !
// **********************

// export default class MyRCFieldForm extends React.Component {
//   formRef = React.createRef();
//   componentDidMount() {
//     console.log('form', this.formRef.current);
//     // this.formRef.current.setFieldsValue({ username: 'default' });
//   }

//   onFinish = (val) => {
//     console.log('onFinish', val);
//   };

//   // 表单校验失败执行
//   onFinishFailed = (val) => {
//     console.log('onFinishFailed', val);
//   };
//   render() {
//     return (
//       <div>
//         <h3>MyRCFieldForm</h3>
//         <Form ref={this.formRef} onFinish={this.onFinish} onFinishFailed={this.onFinishFailed}>
//           <Field name='username' rules={[nameRules]}>
//             <Input placeholder='Username' />
//           </Field>
//           <Field name='password' rules={[passworRules]}>
//             <Input placeholder='Password' />
//           </Field>
//           <button>Submit</button>
//         </Form>
//       </div>
//     );
//   }
// }
