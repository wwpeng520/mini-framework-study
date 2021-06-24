import React, { useEffect } from 'react';
import { Input, Button } from 'antd4';
import Form from '../components/antd-form4-1';

export default function AntdFormPage() {
  const [form] = Form.useForm();

  useEffect(() => {
    // 如果是静态数据，可以使用 Form 的 initialValues 属性初始化
    // 模拟网络请求
    setTimeout(() => {
      form.setFieldsValue({
        password: 'f password',
      });
    }, 3000);
  }, [form]);

  function onFinish(values) {
    // antd@3 提交函数 onSubmit 不会传入 values，需要通过 getFieldsValue 或者 validateFields/validateFieldsAndScroll 获取表单的数据
    // antd@3 使用的是高级组件的方式，通过组件的 props.getFieldsValue 等方法获取表单数据
    // antd@4 使用的是开辟空间存储状态，最外层 Form 上可以直接获取 formInstance，获取状态和调用 onFinish 等方法
    console.log('onFinish: ', values);
    console.log('onFinish form.getFieldsValue: ', form.getFieldsValue());
  }

  // 表单校验失败执行
  function onFinishFailed(values) {
    console.log('onFinishFailed: ', values);
  }

  return (
    <Form form={form} initialValues={{ name: 'init name' }} onFinish={onFinish} onFinishFailed={onFinishFailed}>
      <Form.Item name='name' label='姓名' rules={[{ required: true, message: '请输入姓名！' }]}>
        <Input placeholder='请输入name' />
      </Form.Item>
      <Form.Item name='password' label='密码' rules={[{ required: true, message: '请输入密码！' }]}>
        <Input placeholder='请输入password' />
      </Form.Item>
      <Form.Item name='mobile' label='手机号' rules={[{ required: true, message: '请输入手机号！' }]}>
        <Input placeholder='请输入mobile' />
      </Form.Item>
      <Button htmlType='submit' type='primary'>
        提交
      </Button>
    </Form>
  );
}

// export default class AntdFormPage extends React.Component {
//   formRef = React.createRef();

//   componentDidMount() {
//     setTimeout(() => {
//       this.formRef.current.setFieldsValue({ password: 'c password' });
//     }, 3000);
//   }

//   onFinish = (values) => {
//     console.log('onFinish: ', values);
//   };

//   onFinishFailed = (values) => {
//     console.log('onFinishFailed: ', values);
//   };
//   render() {
//     return (
//       <Form ref={this.formRef} onFinish={this.onFinish} onFinishFailed={this.onFinishFailed}>
//         <Form.Item name='name' label='姓名' initialValue='init name' rules={[{ required: true, message: '请输入姓名！' }]}>
//           <Input placeholder='请输入name' />
//         </Form.Item>
//         <Form.Item name='password' label='密码' rules={[{ required: true, message: '请输入密码！' }]}>
//           <Input placeholder='请输入password' />
//         </Form.Item>
//         <Form.Item name='mobile' label='手机号' rules={[{ required: true, message: '请输入手机号！' }]}>
//           <Input placeholder='请输入mobile' />
//         </Form.Item>
//         <Button htmlType='submit'>提交</Button>
//       </Form>
//     );
//   }
// }
