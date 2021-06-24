import React from 'react';
import FormContext from './context';

// 高阶组件
export default function createForm(Cmp) {
  return class App extends React.Component {
    constructor(props) {
      super(props);
      this.state = {};
      this.options = {};
      this.fieldInitialValue = {};
    }

    handleChange = (e) => {
      const { name, value } = e.target;
      this.setState({ [name]: value });
    };

    getFieldsValue = () => {
      const { _errors, ...restState } = this.state;
      return { ...this.fieldInitialValue, ...restState };
    };

    getFieldValue = (fieldName) => {
      return this.fieldInitialValue[fieldName] || this.state[fieldName];
    };

    setFieldsValue = (newState = {}) => {
      this.setState({ ...newState });
    };

    getFieldDecorator = (fieldName, option) => (InputCmp) => {
      // 变成受控组件
      // option: {
      //   initialValue: 'init name',
      //   rules: [{ required: true, message: '请输入姓名！' }],
      // }
      this.options[fieldName] = option;
      if ('initialValue' in option) {
        // 初始化数据不放在 state 上，因为每次更新 getFieldDecorator 都会获取到 initialValue，而不是只初始化一次
        this.fieldInitialValue[fieldName] = option.initialValue;

        // 不能用 setState，也不能直接修改，因为 state 改变，所有的子组件都会重新更新，getFieldDecorator 也会重新执行
        // this.setState({ [fieldName]: initValue });
        // this.state[fieldName] = initValue;
      }
      return React.cloneElement(InputCmp, {
        name: fieldName,
        value: this.state[fieldName] || this.fieldInitialValue[fieldName] || '',
        onChange: this.handleChange,
      });
    };

    validateFields = (callback) => {
      let err = [];
      for (let fieldName in this.options) {
        if (!this.fieldInitialValue[fieldName] && !this.state[fieldName]) {
          let errorMsgs = [];
          const { rules = [] } = this.options[fieldName];
          if (rules.length) {
            errorMsgs = rules.filter((rule) => rule.required !== false);
          }
          err.push({ [fieldName]: errorMsgs });
        }
      }

      if (err.length === 0) {
        callback(null, { ...this.state });
        this.setState({ _errors: [] });
      } else {
        callback(err, { ...this.state });
        this.setState({ _errors: err });
      }
    };

    getForm = () => {
      return {
        getFieldsValue: this.getFieldsValue,
        getFieldValue: this.getFieldValue,
        setFieldsValue: this.setFieldsValue,
        getFieldDecorator: this.getFieldDecorator,
        validateFields: this.validateFields,
      };
    };

    render() {
      const form = this.getForm();
      return (
        <FormContext.Provider value={{ errors: this.state._errors }}>
          <Cmp {...this.props} form={form} />
        </FormContext.Provider>
      );
    }
  };
}
