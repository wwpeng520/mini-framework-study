import React, { useEffect } from 'react';
// import Form, { Field } from 'rc-field-form';
import Form, { Field } from '../components/my-rc-field-form';
import Input from '../components/Input';

const nameRules = { required: true, message: '请输入姓名！' };
const passworRules = { required: true, message: '请输入密码！' };

export default function MyRCFieldForm() {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    // antd@3 提交函数 onSubmit 不会传入 values，需要通过 getFieldsValue 或者 validateFields/validateFieldsAndScroll 获取表单的数据
    // antd@3 使用的是高级组件的方式，通过组件的 props.getFieldsValue 等方法获取表单数据
    // antd@4 使用的是开辟空间存储状态，把 Form 上的 onFinish 方法直接传入 useForm 内部调用，所以能够传入表单数据
    console.log('onFinish values: ', values);
  };

  // 表单校验失败执行
  const onFinishFailed = (values) => {
    console.log('onFinishFailed values: ', values);
  };

  useEffect(() => {
    console.log('form', form);
    // 可以使用 Form 的 initialValues 熟悉初始化
    // form.setFieldsValue({ username: 'default username' });
  }, [form]);

  return (
    <div>
      <h3>MyRCFieldForm</h3>
      <Form form={form} initialValues={{ username: 'init username' }} onFinish={onFinish} onFinishFailed={onFinishFailed}>
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
