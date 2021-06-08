import React from 'react';

class FormStore {
  constructor() {
    this.store = {};

    // 开辟一个空间存储Fields
    this.fieldEntities = [];

    // Form 组件传入 onFinish, onFinishFailed，提交时执行
    this.callbacks = {};
  }

  // 订阅和取消订阅，监听和取消监听要成对出现
  setFieldEntities = (entity) => {
    this.fieldEntities.push(entity);

    // 返回取消监听函数
    return () => {
      this.fieldEntities = this.fieldEntities.filter((item) => item !== entity);
      delete this.store[entity.props.name];
    };
  };

  setCallbacks = (newCallbacks) => {
    this.callbacks = {
      ...this.callbacks,
      ...newCallbacks,
    };
  };

  getFieldsValue = () => {
    return { ...this.store };
  };

  getFieldValue = (name) => {
    return this.store[name];
  };

  setFieldsValue = (newStore) => {
    // 1. 更新store
    this.store = {
      ...this.store,
      ...newStore,
    };

    // 2. 更新组件（只会更新对应的 Field 组件）
    this.fieldEntities.forEach((entity) => {
      Object.keys(newStore).forEach((k) => {
        if (k === entity.props.name) {
          entity.onStoreChange();
        }
      });
    });
  };

  validate = () => {
    // 存储错误信息
    let err = [];

    this.fieldEntities.forEach((field) => {
      const { name, rules } = field.props;
      let rule = rules && rules[0];
      let value = this.getFieldValue(name);
      if (rule && rule.required && !value) {
        err.push({
          [name]: rule.message,
          value,
        });
      }
    });

    return err;
  };

  submit = () => {
    let err = this.validate();
    console.log('err: ', err);
    const { onFinish, onFinishFailed } = this.callbacks;
    if (err.length > 0) {
      // 出错了
      onFinishFailed(err, this.getFieldsValue());
    } else {
      // 校验通过
      onFinish(this.getFieldsValue());
    }
  };

  // 导出获取、变更 store 方法，以及表单验证等执行等
  getForm = () => {
    return {
      getFieldsValue: this.getFieldsValue,
      getFieldValue: this.getFieldValue,
      setFieldsValue: this.setFieldsValue,
      setFieldEntities: this.setFieldEntities,
      setCallbacks: this.setCallbacks,
      validate: this.validate,
      submit: this.submit,
    };
  };
}

// const [form] = Form.useForm();
// form 对象上挂载了获取、变更 formStore 等方法：form.getFieldsValue, form.setFieldsValue...
export default function useForm(form) {
  const formRef = React.useRef();

  if (!formRef.current) {
    // formStore 在整个生命周期中只能初始化一次，否则每次更新去初始化，那每次初始化前表单变更的数据都会丢失
    if (form) {
      formRef.current = form;
    } else {
      const formStore = new FormStore();
      formRef.current = formStore.getForm();
    }
  }

  return [formRef.current];
}
