import { useEffect } from 'react';
import { Button, Input } from 'antd3';
import Form from '../components/antd-form3';
// import Input from '../components/Input';

function Antd3FormPage({ form }) {
  const { getFieldDecorator, getFieldsValue, getFieldValue, setFieldsValue, validateFields } = form;
  useEffect(() => {
    // 模拟网络请求
    setTimeout(() => {
      setFieldsValue({
        password: 'f password',
      });
    }, 3000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function onSubmit(e) {
    e.preventDefault();
    console.log('onSubmit: ', e);

    console.log('getFieldsValue: ', getFieldsValue(), getFieldValue('name'));

    validateFields((err, vals) => {
      if (err) {
        console.error('失败', err);
      } else {
        console.log('成功', vals);
      }
    });
  }
  return (
    <div>
      <Form onSubmit={onSubmit}>
        <Form.Item label='姓名'>
          {getFieldDecorator('name', {
            initialValue: 'init name',
            rules: [{ required: true, message: '请输入姓名！' }],
          })(<Input placeholder='请输入姓名' />)}
        </Form.Item>

        <Form.Item label='密码'>
          {getFieldDecorator('password', {
            initialValue: 'password',
            rules: [{ required: true, message: '请输入密码！' }],
          })(<Input placeholder='请输入密码' />)}
        </Form.Item>

        <Form.Item label='手机号'>
          {getFieldDecorator('mobile', {
            rules: [
              { required: true, message: '请输入手机号！' },
              { min: 11, message: '手机号为11位！' },
            ],
          })(<Input placeholder='请输入手机号' />)}
        </Form.Item>

        <Button htmlType='submit'>提交</Button>
      </Form>
    </div>
  );
}

// class Antd3FormPage extends React.Component {
//   componentDidMount() {
//     const { setFieldsValue } = this.props.form;
//     setTimeout(() => {
//       setFieldsValue({ password: 'c password' });
//     }, 3000);
//   }

//   onSubmit = (e) => {
//     const { getFieldsValue, getFieldValue, validateFields } = this.props.form;

//     e.preventDefault();
//     console.log('onSubmit: ', e);

//     console.log('getFieldsValue: ', getFieldsValue(), getFieldValue('name'));

//     validateFields((err, vals) => {
//       if (err) {
//         console.error('失败', err);
//       } else {
//         console.log('成功', vals);
//       }
//     });
//   };
//   render() {
//     const { getFieldDecorator } = this.props.form;
//     return (
//       <div className='form-outter'>
//         <Form onSubmit={this.onSubmit}>
//           <Form.Item label='姓名'>
//             {getFieldDecorator('name', {
//               initialValue: 'init name',
//               rules: [{ required: true, message: '请输入姓名！' }],
//             })(<Input placeholder='请输入姓名' />)}
//           </Form.Item>

//           <Form.Item label='密码'>
//             {getFieldDecorator('password', {
//               initialValue: 'init password',
//               rules: [{ required: true, message: '请输入密码！' }],
//             })(<Input placeholder='请输入密码' />)}
//           </Form.Item>

//           <Form.Item label='手机号'>
//             {getFieldDecorator('mobile', {
//               rules: [
//                 { required: true, message: '请输入手机号！' },
//                 { min: 11, message: '手机号为11位！' },
//               ],
//             })(<Input placeholder='请输入手机号' />)}
//           </Form.Item>

//           <Button htmlType='submit'>提交</Button>
//         </Form>
//       </div>
//     );
//   }
// }

export default Form.create()(Antd3FormPage);
