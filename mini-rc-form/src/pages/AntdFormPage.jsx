import React, { useEffect } from 'react';
import { Form, Button, Input } from 'antd';

const FormItem = Form.Item;

const nameRules = { required: true, message: '请输入姓名！' };
const passworRules = { required: true, message: '请输入密码！' };

// class AntdFormPage extends Component {
//   formRef = React.createRef();

//   componentDidMount() {
//     this.formRef.current.setFieldsValue({username: "defalut"});
//   }
//   onFinish = (val) => {
//     console.log("onFinish", val);
//   };
//   onFinishFailed = (val) => {
//     console.log("onFinishFailed", val);
//   };
//   render() {
//     return (
//       <div>
//         <h3>AntdFormPage</h3>
//         <Form
//           ref={this.formRef}
//           onFinish={this.onFinish}
//           onFinishFailed={this.onFinishFailed}>
//           <FormItem name="username" label="姓名" rules={[nameRules]}>
//             <Input placeholder="username placeholder" />
//           </FormItem>
//           <FormItem name="password" label="密码" rules={[passworRules]}>
//             <Input placeholder="password placeholder" />
//           </FormItem>
//           <FormItem>
//             <Button type="primary" size="large" htmlType="submit">
//               Submit
//             </Button>
//           </FormItem>
//         </Form>
//       </div>
//     );
//   }
// }

// export default AntdFormPage;

export default function AntdFormPage(props) {
  const [form] = Form.useForm();
  const onFinish = (val) => {
    console.log('onFinish', val);
  };
  const onFinishFailed = (val) => {
    console.log('onFinishFailed', val);
  };

  useEffect(() => {
    // form.setFieldsValue({username: "defalut"});
    console.log('form', form);
  }, [form]);

  return (
    <div>
      <h3>AntdFormPage</h3>
      <Form form={form} onFinish={onFinish} onFinishFailed={onFinishFailed}>
        <FormItem name='username' label='姓名' rules={[nameRules]}>
          <Input placeholder='username placeholder' />
        </FormItem>
        <FormItem name='password' label='密码' rules={[passworRules]}>
          <Input placeholder='password placeholder' />
        </FormItem>
        <FormItem>
          <Button type='primary' size='large' htmlType='submit'>
            Submit
          </Button>
        </FormItem>
      </Form>
    </div>
  );
}
